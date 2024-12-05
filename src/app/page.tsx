import { NextPage } from "next";
import dynamic from "next/dynamic";
const UserApp = dynamic(() => import("@/components/UserApp"), { ssr: false });

const Home: NextPage = () => <UserApp />;

export default Home;