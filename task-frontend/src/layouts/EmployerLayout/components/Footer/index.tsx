const Footer = () => {
  return (
    <p className="font-normal text-inherit text-center">
      Copyright &copy; {new Date().getFullYear()}, by{" "}
      <a
        href="https://github.com/phamtanhoang"
        className="hover:text-orangetext"
      >
        Hoang Pham
      </a>
    </p>
  );
};
export default Footer;
