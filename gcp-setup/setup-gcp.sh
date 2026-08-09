#!/bin/bash
# Script Automation GCP Workload Identity Federation (WIF) untuk GitHub Actions CI/CD
# Jalankan script ini di Google Cloud Shell (browser) atau Linux terminal

set -e

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
  echo "Penggunaan: ./setup-gcp.sh <PROJECT_ID> <GITHUB_USERNAME> <REPO_NAME>"
  echo "Contoh: ./setup-gcp.sh portfolio-hafid-2026 hafid portfolio-app"
  exit 1
fi

PROJECT_ID=$1
REPO_OWNER=$2
REPO_NAME=$3
REGION=${4:-"us-central1"}

echo "=== Setting up GCP Project: $PROJECT_ID ==="

# 1. Set current project
gcloud config set project $PROJECT_ID

# 2. Enable Required APIs
echo "Enabling GCP APIs..."
gcloud services enable iamcredentials.googleapis.com \
                       cloudresourcemanager.googleapis.com \
                       artifactregistry.googleapis.com \
                       run.googleapis.com \
                       compute.googleapis.com

# 3. Create Service Account for GitHub Actions
SA_NAME="github-deployer"
SA_EMAIL="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo "Creating Service Account: $SA_NAME..."
gcloud iam service-accounts create $SA_NAME \
    --display-name="GitHub Actions Deployer" || true

# 4. Assign IAM Roles to Service Account
echo "Assigning IAM Roles..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/iam.serviceAccountUser"

# 5. Create Artifact Registry Repository
echo "Creating Artifact Registry repository 'portfolio-repo'..."
gcloud artifacts repositories create portfolio-repo \
    --repository-format=docker \
    --location=$REGION \
    --description="Docker repository for portfolio site" || true

# 6. Create Workload Identity Pool
POOL_NAME="github-pool"
echo "Creating Workload Identity Pool '$POOL_NAME'..."
gcloud iam workload-identity-pools create $POOL_NAME \
    --location="global" \
    --display-name="GitHub Actions Pool" || true

POOL_ID=$(gcloud iam workload-identity-pools describe $POOL_NAME --location="global" --format="value(name)")

# 7. Create Workload Identity Provider
PROVIDER_NAME="github-provider"
echo "Creating Workload Identity Provider '$PROVIDER_NAME'..."
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME \
    --location="global" \
    --workload-identity-pool=$POOL_NAME \
    --display-name="GitHub Provider" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" || true

# 8. Allow GitHub Repo to impersonate Service Account
echo "Binding IAM Workload Identity User..."
gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/$POOL_ID/attribute.repository/$REPO_OWNER/$REPO_NAME"

# 9. Print Output for GitHub Secrets
PROVIDER_FULL_NAME=$(gcloud iam workload-identity-pools providers describe $PROVIDER_NAME --location="global" --workload-identity-pool=$POOL_NAME --format="value(name)")

echo ""
echo "======================================================="
echo "GCP SETUP COMPLETED!"
echo "Simpan nilai berikut di GitHub Repository Settings -> Secrets and Variables -> Actions:"
echo "1. Variable 'GCP_PROJECT_ID': $PROJECT_ID"
echo "2. Variable 'GCP_SERVICE_ACCOUNT': $SA_EMAIL"
echo "3. Variable 'GCP_WORKLOAD_IDENTITY_PROVIDER': $PROVIDER_FULL_NAME"
echo "======================================================="
