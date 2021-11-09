import { useRouter } from "next/router";

//HOC(Higher-Order Component)
const Guard = (Component) => {
  const Result = (props) => {
    const Router = useRouter();
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        Router.replace("/login");
        return null;
      }
      return (
        <>
          <Component {...props} />
        </>
      );
    }
    return null;
  };
  return Result;
};

export default Guard;
