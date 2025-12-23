import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What are your shipping times?",
    answer: "We ship within 24-48 hours. Delivery takes 3-5 business days for metro cities and 5-7 days for other locations. Free shipping on orders above ₹999.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer 7-day easy returns for unworn items with tags attached. Simply contact us and we'll arrange a pickup. Refunds are processed within 5-7 business days.",
  },
  {
    question: "How do I find my size?",
    answer: "Check our size guide on each product page. Our tees are designed with an oversized fit. If you prefer a regular fit, we recommend sizing down.",
  },
  {
    question: "How do I care for my YEOUBI tees?",
    answer: "Machine wash cold, inside out. Tumble dry low or hang dry. Do not iron directly on prints. This helps maintain the fabric quality and print durability.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="contact" className="section-padding bg-secondary/10">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-caption mb-4">NEED HELP?</p>
          <h2 className="text-headline">Frequently Asked Questions</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-display font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="text-body pt-4">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FAQ;
