import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import PageMain from "./PageMain";
import PageFooter from "./PageFooter";
import PageSideBar from "./PageSideBar";

export default function Page(props) {
  const { children } = props;
  const location = useLocation();

  return (
    <div className="min-h-[150vh] flex flex-col"> 
      <PageHeader />
      <div className="flex flex-1">
        <PageSideBar />
        <PageMain>
          <motion.div
            key={location.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </PageMain>
      </div>
      <motion.div
        key={location.key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PageFooter />
      </motion.div>
    </div>
  );
}