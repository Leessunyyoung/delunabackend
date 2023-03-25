const Footer = () => {
  const footer_style = {
    width: "100%",
    bottom: 0,
    //border: "1px solid black",
  };
  return (
    <div>
      <footer style={footer_style}>
        <div className="address">
          <p>
            서울시 서초구 서초대로 | 사업자등록번호:001-00-00111 |
            전화번호:xxx-xxx-xxx
          </p>
        </div>
        <div className="copyright">
          <p>Copyright @2023 elice.All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
