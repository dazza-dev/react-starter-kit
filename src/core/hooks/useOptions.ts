import { useQuery } from "@tanstack/react-query";
import axios from "@/core/utils/axios";
import type { NamedOption } from "@/core/types/common.type";

/**
 * Select option lists reused across the system; they don't require their own permission.
 */
function useOptionList(resource: "roles" | "groups") {
  return useQuery<NamedOption[]>({
    queryKey: ["options", resource],
    queryFn: async () => {
      const { data } = await axios.get<{ data: NamedOption[] }>(`settings/${resource}`);
      return data.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export const useRoleOptions = () => useOptionList("roles");
export const useGroupOptions = () => useOptionList("groups");
