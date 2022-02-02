import { MenuBar } from "../components/MenuBar";
import { Drawer } from "../components/Drawer";
import { CreateWallet } from "../components/CreateWallet";

export default function Home() {
  return (
    <div>
      <MenuBar/>
      <div className="flex flex-row mt">
        <Drawer/>
        <CreateWallet/>
      </div>
    </div>
  )
}
