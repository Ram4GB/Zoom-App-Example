import { Box, IconButton } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Option {
  icon: IconType;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Option = (props: Option) => {
  const { icon: Icon, text, isActive } = props;

  return (
    <Box
      transition="background-color 0.3s ease"
      cursor="pointer"
      _hover={{ bgColor: "#eee" }}
      p={6}
      as="div"
      display="flex"
      alignItems="center"
      h="46px"
      bgColor={isActive ? "#eee" : ""}
      onClick={props.onClick}
    >
      <IconButton
        display="flex"
        justifyContent="center"
        variant="unstyled"
        aria-label=""
        color="zlight-grey"
        fontSize="20px"
        icon={<Icon />}
        as="button"
      />
      <Box as="p" className="text-[14px] font-semibold" color="zlight-grey">
        {text}
      </Box>
    </Box>
  );
};

export default Option;
