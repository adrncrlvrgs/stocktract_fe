import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../../modules/login/LoginForm";
import { ToastContainer } from "react-toastify";

export default function Index() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const floatingShapeVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <div className="font-[sans-serif] relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Background Blobs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl"
          variants={blobVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl"
          variants={blobVariants}
          animate="animate"
        />

        <motion.div
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-50"
          variants={floatingShapeVariants}
          animate="float"
        />
        <motion.div
          className="absolute top-1/3 right-8 w-16 h-16 bg-purple-200 rounded-full opacity-50"
          variants={floatingShapeVariants}
          animate="float"
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-50"
          variants={floatingShapeVariants}
          animate="float"
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 20, 0],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 z-50 relative ">
          <motion.div
            className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <motion.h2
                className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Stocktract.
              </motion.h2>
              <p className="text-sm mt-6 mb-1 text-gray-800">
                Your Ultimate Web-Based Inventory Management Solution.
              </p>
              <motion.p
                className="text-sm mt-12 text-gray-800 "
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Don't have an account{" "}
                <a
                  href="/signup"
                  className="text-blue-600 font-semibold hover:underline ml-1 "
                >
                  Register here
                </a>
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 flex items-center justify-center"
            >
              <LoginForm />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
}
