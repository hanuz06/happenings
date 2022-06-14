import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Upcoming Events {new Date().getFullYear()}</p>
      <p>
        <Link href='/about'>About Upcoming Events</Link>
      </p>
    </footer>
  );
}
