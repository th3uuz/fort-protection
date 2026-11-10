import Image from "next/image";
import { site } from "@/lib/site";
import styles from "./MarcaBanner.module.css";

export default function MarcaBanner() {
  return (
    <div className={styles.marca}>
      <Image src="/images/logo-fort-protection.png" alt="" width={56} height={56} loading="eager" />
      <span>{site.name}</span>
    </div>
  );
}
