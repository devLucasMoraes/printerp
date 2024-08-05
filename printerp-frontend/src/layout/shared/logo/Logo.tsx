import { styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const LinkStyled = styled(Link)(() => ({
  height: "75.2px",
  width: "221px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/dark-logo.svg"
        alt="logo"
        height={75.2}
        width={212.53}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
