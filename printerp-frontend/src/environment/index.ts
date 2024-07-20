// Definir constantes para valores fixos
const LIMITE_DE_LINHAS_PADRAO = 10;

// Definir caminhos de URL para diferentes entidades
const PagePaths = {
  REQUISITANTES: {
    LIST_PAGE: "/requisitantes",
    SHOW_PAGE: "/requisitantes/id/show",
    EDIT_PAGE: "/requisitantes/id/edit",
    COPY_PAGE: "/requisitantes/create/id/copy",
    CREATE_PAGE: "/requisitantes/create",
  },
  EQUIPAMENTOS: {
    LIST_PAGE: "/equipamentos",
    SHOW_PAGE: "/equipamentos/id/show",
    EDIT_PAGE: "/equipamentos/id/edit",
    COPY_PAGE: "/equipamentos/create/id/copy",
    CREATE_PAGE: "/equipamentos/create",
  },
  NFE_DE_COMPRA: {
    LIST_PAGE: "/dashboard/nfe/compra",
    SHOW_PAGE: "/dashboard/nfe/compra/id/show",
    EDIT_PAGE: "/dashboard/nfe/compra/id/edit",
    CREATE_PAGE: "/dashboard/nfe/compra/create",
  },
  REQUISICOES_ESTOQUE: {
    LIST_PAGE: "/requisicoes-estoque",
    SHOW_PAGE: "/requisicoes-estoque/id/show",
    EDIT_PAGE: "/requisicoes-estoque/id/edit",
    COPY_PAGE: "/requisicoes-estoque/create/id/copy",
    CREATE_PAGE: "/requisicoes-estoque/create",
  },
  TRANSPORTADORAS: {
    LIST_PAGE: "/dashboard/transportadoras",
    SHOW_PAGE: "/dashboard/transportadoras/id/show",
    EDIT_PAGE: "/dashboard/transportadoras/id/edit",
    CREATE_PAGE: "/dashboard/transportadoras/create",
  },
  FORNECEDORAS: {
    LIST_PAGE: "/dashboard/fornecedoras",
    SHOW_PAGE: "/dashboard/fornecedoras/id/show",
    EDIT_PAGE: "/dashboard/fornecedoras/id/edit",
    CREATE_PAGE: "/dashboard/fornecedoras/create",
  },
  ESTOQUE: {
    ACERTO_ESTOQUE: "/estoque/acerto",
    SALDO: "/estoque/saldo",
  },
  INSUMOS: {
    ACERTO_ESTOQUE: "/estoque/acerto",
    ESTOQUE: "/estoque",
    QUERY: "/insumos/query",
    LIST_PAGE: "/insumos",
    SHOW_PAGE: "/insumos/id/show",
    EDIT_PAGE: "/insumos/id/edit",
    COPY_PAGE: "/insumos/create/id/copy",
    CREATE_PAGE: "/insumos/create",
  },
  CATEGORIAS: {
    LIST_PAGE: "/categorias",
    SHOW_PAGE: "/categorias/id/show",
    EDIT_PAGE: "/categorias/id/edit",
    COPY_PAGE: "/categorias/create/id/copy",
    CREATE_PAGE: "/categorias/create",
  },
  VINCULOS: {
    LIST_PAGE: "/dashboard/vinculos",
    SHOW_PAGE: "/dashboard/vinculos/id/show",
    EDIT_PAGE: "/dashboard/vinculos/id/edit",
    CREATE_PAGE: "/dashboard/vinculos/create",
  },
};

// Definir a URL base para recuperação de dados
const URL_BASE = process.env.NEXT_PUBLIC_BACKEND_URL_API;

// Exportar o objeto Environment aprimorado
export const Environment = {
  // Limite de linhas para listagens
  LIMITE_DE_LINHAS: LIMITE_DE_LINHAS_PADRAO,

  // Caminhos de URL para diferentes páginas
  ...PagePaths,

  // URL base para recuperação de dados
  URL_BASE: URL_BASE,
};
