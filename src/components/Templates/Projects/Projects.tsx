import { AnimatePresence, motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiLayoutGridLine,
  RiStackLine,
} from "react-icons/ri";
import { useInView } from "react-intersection-observer";

import AdvancedTextAnimation from "@/components/Animations/AdvancedTextAnimation";
import {
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import ScrollToTop from "@/components/Animations/ScrollToTop";
import ProjectCard from "@/components/Other/ProjectCard/ProjectCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Other/UI/tabs";

// Example project data
export const workData: {
  image: string;
  category: string;
  name: string;
  description: string;
  link: string;
  github: string;
  language?: "javascript" | "typescript" | "python" | "shopify";
  tags?: string[];
}[] = [];

interface GitHubProject {
  github: string;
  name: string;
  category: string;
  // Add other fields that are used in your project
  tags?: string[];
  language?: string;
}

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState(workData);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("Todos");
  const [isChanging, setIsChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null); // Inicializa como null
  const [formattedUpdateTime, setFormattedUpdateTime] = useState<string>(""); // String formatada para exibição
  // Estados para carregamento lazy
  const [visibleProjects, setVisibleProjects] = useState<number>(9); // Número inicial de projetos visíveis
  const [hasMoreProjects, setHasMoreProjects] = useState(true); // Indica se há mais projetos para carregar
  const loadMoreRef = useRef<HTMLDivElement>(null); // Referência para o elemento de observação
  const controls = useAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Hook para detectar quando o usuário chega ao final da lista
  const { ref: loadMoreElementRef, inView: loadMoreIsVisible } = useInView({
    threshold: 0.1,
  });

  // Calcular o número total de projetos na categoria atual
  const totalProjectsInCategory = projectsData.filter((project) =>
    category === "Todos" ? true : project.category === category
  ).length;

  // Efeito para carregar mais projetos quando o elemento de carregamento ficar visível
  useEffect(() => {
    if (loadMoreIsVisible && hasMoreProjects && !isLoading) {
      // Incrementar o número de projetos visíveis
      setVisibleProjects((prev) => {
        const newValue = prev + 6;
        // Verificar se ainda há mais projetos para carregar depois desta adição
        setHasMoreProjects(newValue < totalProjectsInCategory);
        return newValue;
      });
    }
  }, [loadMoreIsVisible, hasMoreProjects, isLoading, totalProjectsInCategory]);

  // Efeito para formatar a data de última atualização apenas no cliente
  useEffect(() => {
    // Inicializar a data de última atualização apenas no cliente para evitar erros de hidratação
    if (!lastUpdated) {
      setLastUpdated(new Date());
    }

    // Formatar a data sem incluir segundos para evitar diferenças entre cliente e servidor
    if (lastUpdated) {
      const hours = lastUpdated.getHours();
      const minutes = lastUpdated.getMinutes();
      const formattedTime = `${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
      setFormattedUpdateTime(`Last update: ${formattedTime}`);
    }
  }, [lastUpdated]);

  // Função para carregar projetos do GitHub
  const loadProjects = async () => {
    try {
      setIsLoading(true);

      // Usar o nome de usuário GitHub das variáveis de ambiente ou valor padrão
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "adamsnows";
      const portfolioTag =
        process.env.NEXT_PUBLIC_PORTFOLIO_TAG || "portfolio-project";

      // Adicionar timestamp para evitar cache
      const timestamp = new Date().getTime();

      // Fazer chamada direta à API para buscar projetos do GitHub
      const response = await fetch(
        `/api/github/projects?username=${username}&portfolioTag=${portfolioTag}&_=${timestamp}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub projects");
      }

      const githubProjects = await response.json();

      // Verificar se há algum projeto do GitHub que já existe nos projetos atuais
      const existingGithubUrls = new Set(
        workData.map((project) => project.github)
      );

      // Filtrar apenas os projetos do GitHub que não existem nos projetos atuais
      const newGithubProjects = githubProjects
        .filter(
          (project: GitHubProject) => !existingGithubUrls.has(project.github)
        )
        .sort((a: any, b: any) => {
          // Ordenar por data de criação, mais recentes primeiro
          if (a.createdAt && b.createdAt) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          // Se não tiver data, vai pro final
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return 0;
        });

      // Combinar os projetos - GitHub primeiro, workData por último
      const combined = [...newGithubProjects, ...workData];

      setProjectsData(combined);
      setLastUpdated(new Date());

      // Verificar se há mais projetos para carregar além do limite inicial
      setHasMoreProjects(combined.length > visibleProjects);

      // Atualizar categorias com base nos projetos combinados
      const uniqueCategories = [
        "Todos",
        ...Array.from(new Set(combined.map((item) => item.category))),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading projects:", error);
      // Fallback para os projetos existentes
      setProjectsData(workData);
      const uniqueCategories = [
        "Todos",
        ...Array.from(new Set(workData.map((item) => item.category))),
      ];
      setCategories(uniqueCategories);
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para carregar projetos do GitHub
  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to get language priority for sorting
  const getLanguagePriority = (language?: string) => {
    switch (language) {
      case "shopify":
        return 1;
      case "typescript":
        return 2;
      case "javascript":
        return 3;
      case "python":
        return 4;
      default:
        return 5; // Any undefined or other languages come last
    }
  };

  // Filtrar projetos com base na categoria selecionada e ordenar por prioridade de linguagem
  const filteredProjects = projectsData
    .filter((project) => {
      return category === "Todos" ? project : project.category === category;
    })
    .sort((a, b) => {
      // Sort by language priority (shopify > typescript > javascript > python)
      return getLanguagePriority(a.language) - getLanguagePriority(b.language);
    })
    .slice(0, visibleProjects); // Limita o número de projetos exibidos

  // Efeito para animar o título quando estiver visível
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  // Efeito para animar o título com gradiente em movimento
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          backgroundPositionX: "0%",
        },
        {
          backgroundPositionX: "100%",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "linear",
        }
      );
    }
  }, []);

  // Efeito para animar os cards de projeto com scroll - apenas uma vez na montagem
  useEffect(() => {
    if (gridRef.current && typeof window !== "undefined") {
      // Armazena as animações criadas para depois limpá-las se necessário
      const animations: gsap.core.Tween[] = [];
      const projectCards = gridRef.current.querySelectorAll(
        ".project-card-container"
      );

      projectCards.forEach((card, index) => {
        const animation = gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
        animations.push(animation);
      });

      // Limpeza para evitar animações duplicadas
      return () => {
        animations.forEach((anim) => {
          if (anim.scrollTrigger) {
            anim.scrollTrigger.kill();
          }
          anim.kill();
        });
      };
    }
  }, []);

  // Estado para controlar a animação de pulso da categoria ativa
  const [pulseEffect, setPulseEffect] = useState(false);

  // Efeito para animar o pulso periodicamente na categoria selecionada
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true);
      const timeout = setTimeout(() => setPulseEffect(false), 1000);
      return () => clearTimeout(timeout);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === category) return;

    setIsChanging(true);
    setPulseEffect(true); // Ativar pulso ao mudar de categoria

    // Redefinir o número de projetos visíveis ao mudar de categoria
    setVisibleProjects(9);

    // Após um breve intervalo, mude a categoria e desative o estado de mudança
    setTimeout(() => {
      setCategory(newCategory);
      setActiveTab(newCategory);
      setIsChanging(false);

      // Verificar se há mais projetos para carregar na nova categoria
      const projectsInCategory = projectsData.filter((project) =>
        newCategory === "Todos" ? true : project.category === newCategory
      );
      setHasMoreProjects(projectsInCategory.length > 9);

      // Desativar o pulso após um curto intervalo
      setTimeout(() => setPulseEffect(false), 800);
    }, 300);
  };

  return (
    <div className="relative overflow-visible">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2
            ref={titleRef}
            className="section-title mb-6 text-center mx-auto bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent bg-300%"
          >
            MY PROJECTS
          </h2>
          <AdvancedTextAnimation
            text="A bit of my journey as a developer. Many projects are no longer on the old site, or don't have source code access as they are private projects. Thank you for visiting, come back anytime and feel free to leave feedback in the project repository!"
            animationStyle="fade"
            speed={0.02}
            once={true}
            className="text-md text-white/50 max-w-3xl mx-auto text-center"
          />
        </motion.div>

        <Tabs
          defaultValue={category}
          className="mb-24 xl:mb-48 "
          value={activeTab}
        >
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-xl blur-lg opacity-70"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <TabsList
              className="w-full gap-2 grid h-full md:grid-cols-4
              lg:max-w-[640px] mb-12 mx-auto
              relative z-10 backdrop-blur-md bg-white/10
              rounded-xl p-2 border border-white/20 shadow-lg"
            >
              {categories.map((categoryName: string, index: number) => (
                <TabsTrigger
                  onClick={() => handleCategoryChange(categoryName)}
                  value={categoryName}
                  key={index}
                  className="w-[162px] md:w-auto relative overflow-visible group"
                >
                  {/* Fundo ativo do botão */}
                  {categoryName === activeTab && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-background/50 via-secondary to-background/50 rounded-md"
                      layoutId="activeTabBackground"
                      animate={
                        pulseEffect
                          ? {
                              boxShadow: [
                                "0 0 0px rgba(255,255,255,0.3)",
                                "0 0 15px rgba(255,255,255,0.7)",
                                "0 0 0px rgba(255,255,255,0.3)",
                              ],
                              scale: [1, 1.03, 1],
                            }
                          : {}
                      }
                      transition={{
                        type: "tween",
                        duration: 1,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                      }}
                    />
                  )}

                  {/* Efeito de hover no botão da categoria */}
                  <motion.span
                    className="absolute inset-0 bg-background/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                  />

                  {/* Texto com efeito quando ativo */}
                  <span
                    className={`relative z-10 font-medium ${
                      categoryName === activeTab
                        ? "text-white"
                        : "text-white/70"
                    } flex items-center gap-2 justify-center`}
                  >
                    <motion.span
                      transition={
                        categoryName === activeTab
                          ? {
                              duration: 1.5,
                              ease: "easeInOut",
                            }
                          : {}
                      }
                      className="text-lg"
                    >
                      {categoryName === "Todos" && <RiLayoutGridLine />}
                      {categoryName === "Full stack" && <RiStackLine />}
                      {categoryName === "Front end" && <RiCodeSSlashLine />}
                      {categoryName === "Back end" && <RiDatabase2Line />}
                    </motion.span>
                    {categoryName}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>{" "}
          <motion.div
            ref={gridRef}
            className="text-lg xl:mt-8 lg:grid lg:grid-cols-3 gap-6 relative"
            animate={{ opacity: isChanging ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: "300px" }} // Garante altura mínima para o container
          >
            {isLoading ? (
              // Indicador de carregamento
              <div className="col-span-3 py-10 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-white/70">Loading projects...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => {
                  // Detectar linguagem a partir das tags se não houver language definido
                  const inferredProject = { ...project };
                  if (!inferredProject.language && project.tags) {
                    if (project.tags.includes("typescript"))
                      inferredProject.language = "typescript";
                    else if (project.tags.includes("javascript"))
                      inferredProject.language = "javascript";
                    else if (project.tags.includes("python"))
                      inferredProject.language = "python";
                    else if (project.tags.includes("shopify"))
                      inferredProject.language = "shopify";
                  }

                  // Ensure language is a valid type or undefined
                  if (
                    inferredProject.language &&
                    !["typescript", "javascript", "python", "shopify"].includes(
                      inferredProject.language
                    )
                  ) {
                    inferredProject.language = undefined;
                  }

                  return (
                    <TabsContent
                      value={category}
                      key={`project-${project.name}-${project.category}`}
                      className="project-card-container"
                    >
                      <motion.div
                        key={`motion-${project.name}-${project.category}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          y: -10,
                          transition: { duration: 0.2 },
                        }}
                        className="h-full"
                      >
                        <ProjectCard
                          id={index === 0 ? "1" : project.name}
                          project={inferredProject}
                          specialStyle={true}
                        />
                      </motion.div>
                    </TabsContent>
                  );
                })}
              </AnimatePresence>
            )}

            {/* Elemento para carregar mais projetos ao fazer scroll */}
            {!isLoading && hasMoreProjects && (
              <div
                ref={loadMoreElementRef}
                className="col-span-3 py-8 text-center opacity-0"
              >
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-white/70">Loading more projects...</p>
              </div>
            )}
          </motion.div>
        </Tabs>
      </motion.div>

      {/* Botão de voltar ao topo */}
      <ScrollToTop showBelow={300} />
    </div>
  );
};

export default Projects;
