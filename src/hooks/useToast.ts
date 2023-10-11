import { UseToastOptions, useToast as useChakraToast } from "@chakra-ui/react";

const useToast = () => {
  const toast = useChakraToast();

  const error = (props: UseToastOptions) => {
    toast({
      title: "Error",
      status: "error",
      ...props,
    });
  };

  const success = (props: UseToastOptions) => {
    toast({
      title: "Success",
      status: "success",
      ...props,
    });
  };

  const info = (props: UseToastOptions) => {
    toast({
      title: "Info",
      status: "info",
      ...props,
    });
  };

  const warning = (props: UseToastOptions) => {
    toast({
      title: "Warning",
      status: "warning",
      ...props,
    });
  };

  return {
    error,
    success,
    info,
    warning,
  };
};

export default useToast;
