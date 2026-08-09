# Script Automation GCP Workload Identity Federation (WIF) untuk GitHub Actions CI/CD
# Jalankan script ini di Google Cloud SDK Shell, Cloud Shell, atau PowerShell yang sudah login gcloud

param (
    [Parameter(Mandatory=$true)]
    [string]$PROJECT_ID,

    [string]$REGION = "us-central1",
    [string]$REPO_OWNER = "YOUR_GITHUB_USERNAME",
    [string]$REPO_NAME = "YOUR_REPO_NAME"
)

Write-Host "=== Setting up GCP Project: $PROJECT_ID ===" -ForegroundColor Green

# 1. Set current project
gcloud config set project $PROJECT_ID

# 2. Enable Required APIs
Write-Host "Enabling GCP APIs..." -ForegroundColor Yellow
gcloud services enable iamcredentials.googleapis.com `
                       cloudresourcemanager.googleapis.com `
                       artifactregistry.googleapis.com `
                       run.googleapis.com `
                       compute.googleapis.com

# 3. Create Service Account for GitHub Actions
$SA_NAME = "github-deployer"
$SA_EMAIL = "$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

Write-Host "Creating Service Account: $SA_NAME..." -ForegroundColor Yellow
gcloud iam service-accounts create $SA_NAME `
    --display-name="GitHub Actions Deployer"

# 4. Assign IAM Roles to Service Account (Cloud Run + Artifact Registry)
Write-Host "Assigning IAM Roles..." -ForegroundColor Yellow
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SA_EMAIL" `
    --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SA_EMAIL" `
    --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SA_EMAIL" `
    --role="roles/iam.serviceAccountUser"

# 5. Create Artifact Registry Repository for Docker Images
Write-Host "Creating Artifact Registry repository 'portfolio-repo'..." -ForegroundColor Yellow
gcloud artifacts repositories create portfolio-repo `
    --repository-format=docker `
    --location=$REGION `
    --description="Docker repository for portfolio site"

# 6. Create Workload Identity Pool
$POOL_NAME = "github-pool"
Write-Host "Creating Workload Identity Pool '$POOL_NAME'..." -ForegroundColor Yellow
gcloud iam workload-identity-pools create $POOL_NAME `
    --location="global" `
    --display-name="GitHub Actions Pool"

$POOL_ID = (gcloud iam workload-identity-pools describe $POOL_NAME --location="global" --format="value(name)")

# 7. Create Workload Identity Provider
$PROVIDER_NAME = "github-provider"
Write-Host "Creating Workload Identity Provider '$PROVIDER_NAME'..." -ForegroundColor Yellow
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME `
    --location="global" `
    --workload-identity-pool=$POOL_NAME `
    --display-name="GitHub Provider" `
    --issuer-uri="https://token.actions.githubusercontent.com" `
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository"

# 8. Allow GitHub Repo to impersonate Service Account
Write-Host "Binding IAM Workload Identity User..." -ForegroundColor Yellow
gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL `
    --role="roles/iam.workloadIdentityUser" `
    --member="principalSet://iam.googleapis.com/$POOL_ID/attribute.repository/$REPO_OWNER/$REPO_NAME"

# 9. Print Output for GitHub Secrets
$PROVIDER_FULL_NAME = (gcloud iam workload-identity-pools providers describe $PROVIDER_NAME --location="global" --workload-identity-pool=$POOL_NAME --format="value(name)")

Write-Host "`n=======================================================" -ForegroundColor Green
Write-Host "GCP SETUP COMPLETED!" -ForegroundColor Green
Write-Host "Simpan nilai berikut di GitHub Repository Settings -> Secrets and Variables -> Actions:" -ForegroundColor Cyan
Write-Host "1. Variable 'GCP_PROJECT_ID': $PROJECT_ID"
Write-Host "2. Variable 'GCP_SERVICE_ACCOUNT': $SA_EMAIL"
Write-Host "3. Variable 'GCP_WORKLOAD_IDENTITY_PROVIDER': $PROVIDER_FULL_NAME"
Write-Host "=======================================================" -ForegroundColor Green
