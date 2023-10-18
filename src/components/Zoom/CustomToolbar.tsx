import { Box } from "@chakra-ui/layout";
import { Portal } from "@chakra-ui/portal";

const CustomToolbar = () => {
  return (
    <Portal>
      <Box as="div" position="fixed" bgColor="red" right={4} bottom={4}>
        <Box
          as="button"
          onClick={() => {
            console.log(
              "window.zoomClient?.updateVirtualBackgroundList",
              window.zoomClient?.updateVirtualBackgroundList,
            );
            window.zoomClient?.updateVirtualBackgroundList([]);
          }}
          color="white"
          padding={5}
        >
          Update virtual background
        </Box>
      </Box>
    </Portal>
  );
};

export default CustomToolbar;
