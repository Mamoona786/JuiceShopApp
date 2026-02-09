"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import Heading from "@/components/home/Heading";
import SubHeading from "@/components/home/SubHeading";
import FeatureCard from "@/components/home/FeatureCard";
import CategoryTabsSection from "@/components/home/CategoryTabsSection";
import OfferWidget from "@/components/home/OfferWidget";
import CarouselSection from "@/components/home/CarouselSection";
import Footer from "@/components/Footer";
import ToastNotification from "@/components/confirmation/ToastNotification";
import styles from "./page.module.css";

export default function HomePage() {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(false);

  const catalog = {
    apple: { id: "apple", name: "Apple Juice", price: 250, thumbnail: "/images/apple.png" },
    pineapple: { id: "pineapple", name: "Pine Apple Juice", price: 250, thumbnail: "/images/thumb/thumb_pine-apple.png" }
  };

  const onAdd = (item) => {
    addToCart(item);
    setToast(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <HeroSection />

      <section className="container my-5">
        <div className="text-center mb-5">
          <Heading>Our Best Juices</Heading>
          <SubHeading>Try our customer favorites, made with love and the freshest ingredients.</SubHeading>
        </div>
        <div className="row">
          <div className="col-md-4"><FeatureCard item={catalog.apple} onAdd={onAdd} /></div>
          <div className="col-md-4"><FeatureCard item={catalog.apple} onAdd={onAdd} /></div>
          <div className="col-md-4"><FeatureCard item={catalog.apple} onAdd={onAdd} /></div>
        </div>

        <Heading>Explore By Category</Heading>
        <SubHeading>Discover a variety of refreshing juices tailored for every taste.</SubHeading>

        <div className="row">
          <div className="col-md-9 pe-5"><CategoryTabsSection onAdd={onAdd} items={[catalog.apple]} /></div>
          <div className="col-md-3 py-5"><OfferWidget /></div>
        </div>

        <div className="container my-5 text-center">
          <Heading>Try Something Different</Heading>
          <SubHeading>Explore our unique range of fresh juices, crafted to surprise your taste buds.</SubHeading>
          <CarouselSection
            items={[catalog.apple, catalog.pineapple, catalog.apple, catalog.pineapple, catalog.apple, catalog.pineapple]}
            onAdd={onAdd}
          />
        </div>
      </section>

      <Footer />
      <ToastNotification show={toast} message="Added to cart" onClose={() => setToast(false)} />
    </div>
  );
}
