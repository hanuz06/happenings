import Link from "next/link";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout title="About our latest events">
      <h1>About</h1>
      <p>This is an app to find the latest singer</p>
      <p>Version: 1.0.0</p>
      <Link href='/'>Home</Link>
    </Layout>
  );
}
