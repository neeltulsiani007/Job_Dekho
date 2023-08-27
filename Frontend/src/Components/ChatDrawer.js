import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
 
export function ChatDrawer() {

  const [openLeft, setOpenLeft] = React.useState(false);

  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);
 
  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
     <Button onClick={openDrawerLeft}>Open Drawer Left</Button>
      </div>
      <Drawer
        placement="left"
        open={openLeft}
        onClose={closeDrawerLeft}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Drawer on LefopenLeft
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerLeft}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
      </Drawer>
    </React.Fragment>
  );
}