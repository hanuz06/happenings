import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  let eventData = evt.attributes;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={eventData.image.data ? eventData.image.data.attributes.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(eventData.date).toLocaleDateString('en-US')} at {eventData.time}
        </span>
        <h3>{eventData.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${eventData.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
}
