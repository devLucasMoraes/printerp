import { ApiInstance } from "@/api";
import { Environment } from "@/environment";
import { Unidade } from "@/types/enum";
import { TSpringPageData } from "@/types/models";

type InsumosAbaiMin = {
  id: number;
  saldo: number;
  undEstoque: Unidade;
  abaixoDoMinimo: boolean;
};

class DashboardService {
  constructor(protected endpoint: string) {}

  async getAbaixoMinimo(
    page = 0,
    size = Environment.LIMITE_DE_LINHAS
  ): Promise<TSpringPageData<InsumosAbaiMin>> {
    const path = `/abaixo-do-minimo?page=${page}&size=${size}`;

    const response = await ApiInstance.get<TSpringPageData<InsumosAbaiMin>>(
      `${this.endpoint}${path}`
    );

    return response.data;
  }
}

export const dashboardService = new DashboardService("/dashboard");
