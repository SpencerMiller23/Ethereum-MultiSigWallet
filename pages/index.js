import { MenuBar } from "../components/MenuBar";
import { Drawer } from "../components/Drawer";
import { CreateWallet } from "../components/CreateWallet";
import { Overview } from "../components/Overview";

import { Grid } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CreateWallet/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Overview/>
        </Grid>
      </Grid>
    </div>
  )
}
