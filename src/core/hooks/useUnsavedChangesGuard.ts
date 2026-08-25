import { useCallback, useState } from "react";
import { useBlocker, useNavigate } from "react-router";

interface UseUnsavedChangesGuardOptions {
  fallbackPath: string;
}

/**
 * Protects a form against accidental navigation with unsaved changes.
 */
export function useUnsavedChangesGuard({ fallbackPath }: UseUnsavedChangesGuardOptions) {
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [askedManually, setAskedManually] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  );

  // The dialog opens from either the blocker or the form's Cancel button.
  const dialogOpen = askedManually || blocker.state === "blocked";

  const clearUnsavedChanges = useCallback(() => setHasUnsavedChanges(false), []);

  const handleCancelClick = useCallback(() => setAskedManually(true), []);

  const handleConfirm = useCallback(() => {
    setHasUnsavedChanges(false);
    setAskedManually(false);

    if (blocker.state === "blocked") blocker.proceed();
    else void navigate(fallbackPath);
  }, [blocker, navigate, fallbackPath]);

  const handleClose = useCallback(() => {
    setAskedManually(false);
    if (blocker.state === "blocked") blocker.reset();
  }, [blocker]);

  return {
    dialogOpen,
    setHasUnsavedChanges,
    clearUnsavedChanges,
    handleCancelClick,
    handleConfirm,
    handleClose,
  };
}
