"use client";

import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

const teamMembers = [
  {
    id: 1,
    name: "Brucad AL Magribi",
    title: "Frontend Developer",
    bio: "Ahli dalam menciptakan antarmuka pengguna yang intuitif dan responsif. Brucad bertanggung jawab atas UX/UI aplikasi, memastikan pelacakan nutrisi mudah dan menyenangkan bagi pengguna.",
    imageUrl: "/Team/brucad.webp",
    linkedin: "https://linkedin.com/in/brucad-al-magribi-11675233a/",
    github: "https://github.com/almagribii",
    email: "brucadalm@gmail.com",
  },
  {
    id: 2,
    name: "Mustaqim Nawahhudi Ma'arif",
    title: "Full-Stack Developer",
    bio: "Pakar Fullstack Development yang memastikan sistem backend nutrisi bekerja akurat dan cepat. Mustaqim fokus pada arsitektur API, kurasi data nutrisi massal, dan integrasi fitur AI.",
    imageUrl: "/Team/mustaqim.webp",
    linkedin: "https://linkedin.com/in/mcqeems/",
    github: "https://github.com/mcqeems",
    email: "mcqeemsofficial@gmail.com",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Para Penggerak di{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Balik Nutrisi Akurat
            </span>
          </h2>

          <p className="text-muted-foreground animate-[fade-in_1s_ease-out_0.3s_backwards]">
            Kami membangun kepercayaan melalui data yang akurat dan pengalaman
            pengguna yang lancar
          </p>
        </div>

        {/* Kartu Profil Tim */}
        <motion.div
          className="mt-16 space-y-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group flex flex-col items-center bg-card p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:shadow-2xl hover:scale-[1.02] border-t-4 border-primary"
            >
              <div className="relative h-40 w-40 rounded-full overflow-hidden mb-6 border-2 border-primary/50">
                <Image
                  className="object-cover transition duration-300 group-hover:opacity-80"
                  src={member.imageUrl}
                  alt={`Foto ${member.name}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground transition duration-300 group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="text-lg text-primary font-semibold mt-1">
                  {member.title}
                </p>
                <p className="mt-4 text-muted-foreground max-w-md">
                  {member.bio}
                </p>

                {/* Social Media Links */}
                <div className="mt-6 flex justify-center space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition duration-150"
                      aria-label={`${member.name} di LinkedIn`}
                    >
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition duration-150"
                      aria-label={`${member.name} di Twitter`}
                    >
                      <FaGithub className="h-6 w-6" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-primary transition duration-150"
                      aria-label={`Email ${member.name}`}
                    >
                      <FaEnvelope className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
