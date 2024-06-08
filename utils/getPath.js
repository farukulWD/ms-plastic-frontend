import { usePathname } from "next/navigation";
function getPath() {
  const pathname = usePathname();
  return pathname;
}

export default getPath;
