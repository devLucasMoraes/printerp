/* eslint-disable react-hooks/rules-of-hooks */
import { dashboardService } from "@/services/DashboardService";
import { queryOptions } from "@tanstack/react-query";

class DashboardQueries {
  constructor(protected resourceKey: string) {}

  getAbaixoMinimo(page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => dashboardService.getAbaixoMinimo(page, pageSize),
    });
  }
}

export const dashboardQueries = new DashboardQueries("DASHBOARD-KEY");
