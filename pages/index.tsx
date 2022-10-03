
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { User } from "pages/api/user";


export default function Home({ user }: any) {

  const handleClick = async () => {

    await fetch("/api/testSetCookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
  }


  if (user) {
    return (
      <div>
        {user.login}
        <button onClick={handleClick}>Update session</button>
      </div>
    );
  }
  return (
    <div>
      loading
    </div>
  );
}


export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, login: "", avatarUrl: "" } as User,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
  sessionOptions);
