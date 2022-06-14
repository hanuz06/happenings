import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";

export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      console.log('DELETING EVENTS ID8888= ', id)
      console.log('DELETING EVENTS token999999= ', token)
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        // router.push("/events");
        router.reload();
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <ToastContainer />
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {!!events &&
          events.map((evt) => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  return {
    props: {
      events: events.data,
      token,
    },
  };
}
