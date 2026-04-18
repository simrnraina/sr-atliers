import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  identity: ReturnType<typeof useInternetIdentity>["identity"];
  login: () => void;
  logout: () => void;
  principalText: string | null;
}

export function useAuth(): AuthState {
  const {
    identity,
    isAuthenticated,
    isLoggingIn,
    isInitializing,
    login,
    clear,
  } = useInternetIdentity();

  const isLoading = isLoggingIn || isInitializing;

  const principalText =
    identity && isAuthenticated ? identity.getPrincipal().toString() : null;

  return {
    isAuthenticated,
    isLoading,
    identity,
    login,
    logout: clear,
    principalText,
  };
}

export function useIsAdmin(): boolean {
  const { isAuthenticated } = useAuth();
  const { actor, isFetching } = useActor(createActor);

  const { data: isAdmin = false } = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  return isAdmin;
}
