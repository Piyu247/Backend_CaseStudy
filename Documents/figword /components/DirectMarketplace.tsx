import React, { useState } from "react";
import { 
  Store, ShoppingCart, ShieldCheck, Star, MessageSquare, Phone, MapPin, 
  CheckCircle2, DollarSign, Tag, ArrowRight, Lock, QrCode
} from "lucide-react";
import { Language } from "../utils/translations";

interface DirectMarketplaceProps {
  lang: Language;
}

export default function DirectMarketplace({ lang }: DirectMarketplaceProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const listings = [
    {
      id: "prod-1",
      farmerName: "Piyush Patil (Patil Organic Farms)",
      location: "Rahuri, Ahmednagar, Maharashtra",
      organicCertified: true,
      rating: "4.9 ⭐ (48 direct buyer reviews)",
      cropName: "Fresh Harvest Tomatoes (Hybrid Red)",
      price: "₹30 / kg",
      availableQty: "500 kg",
      minOrder: "20 kg",
      harvestDate: "July 24, 2026 (Fresh Harvest)",
      deliveryOptions: "Farm Pickup or Local Transport Available",
      farmSize: "5 Acres Black Soil",
      imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "prod-2",
      farmerName: "Rajeshwar Rao",
      location: "Warangal, Telangana",
      organicCertified: false,
      rating: "4.8 ⭐ (32 direct buyer reviews)",
      cropName: "Premium Bt Cotton Lint (Long Staple)",
      price: "₹72 / kg",
      availableQty: "2,000 kg",
      minOrder: "100 kg",
      harvestDate: "July 20, 2026",
      deliveryOptions: "Inter-state Truck Freight",
      farmSize: "8 Acres Red Soil",
      imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "prod-3",
      farmerName: "Sardar Gurpreet Singh",
      location: "Amritsar, Punjab",
      organicCertified: true,
      rating: "5.0 ⭐ (86 direct buyer reviews)",
      cropName: "Organic Aromatic Basmati Rice (1121 Grain)",
      price: "₹85 / kg",
      availableQty: "1,500 kg",
      minOrder: "50 kg",
      harvestDate: "July 18, 2026",
      deliveryOptions: "Pan-India Freight / Export Pack",
      farmSize: "12 Acres Alluvial Soil",
      imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Marketplace Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-emerald-900/15 via-emerald-600/10 to-teal-900/15 dark:from-emerald-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              🛒 Broker-Free Direct Marketplace
            </span>
            <span className="bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
              UPI Escrow Guaranteed
            </span>
          </div>
          <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit flex items-center gap-2">
            🛒 Direct Farmer Storefront & Marketplace
          </h2>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
            Buy directly from verified Indian farmers or set up your digital storefront to sell produce to restaurants, wholesalers & consumers.
          </p>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-2xl shadow-md transition-all text-xs flex items-center gap-1.5 border border-emerald-500/30">
          <Store className="w-4 h-4" /> Create My Digital Storefront
        </button>
      </div>

      {/* Product Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div key={item.id} className="glass-panel rounded-3xl border border-emerald-900/10 dark:border-white/10 overflow-hidden flex flex-col justify-between bg-white/70 dark:bg-white/5 shadow-sm hover:border-emerald-500/30 transition-all group">
            
            <div className="relative h-48 bg-emerald-950 overflow-hidden">
              <img src={item.imageUrl} alt={item.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {item.organicCertified && (
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  ✓ Organic Certified
                </span>
              )}
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-amber-400 font-black text-sm px-3 py-1 rounded-xl border border-amber-500/30">
                {item.price}
              </span>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block">{item.farmerName}</span>
                <h4 className="text-base font-black text-emerald-950 dark:text-white font-outfit mt-0.5 leading-snug">{item.cropName}</h4>
                <p className="text-[10px] text-emerald-900/60 dark:text-white/50 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-emerald-600" /> {item.location}
                </p>
              </div>

              <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-emerald-900/60 dark:text-white/50">Available Stock:</span>
                  <strong className="text-emerald-950 dark:text-white">{item.availableQty}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-900/60 dark:text-white/50">Min Order:</span>
                  <strong className="text-emerald-950 dark:text-white">{item.minOrder}</strong>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1 flex gap-2">
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  setShowPaymentModal(true);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1 shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Buy Direct (UPI)
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Payment Facilitation Modal */}
      {showPaymentModal && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-nature-950 border border-emerald-500/30 rounded-3xl max-w-md w-full p-6 text-emerald-950 dark:text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-emerald-500/10 dark:border-white/10 pb-3">
              <h3 className="font-extrabold text-base font-outfit flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" /> FinTech Escrow Payment
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-xs font-bold text-emerald-900/50 dark:text-white/50">✕</button>
            </div>

            {paymentSuccess ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-sm">UPI Payment Escrow Secured!</h4>
                <p className="text-xs text-emerald-900/70 dark:text-white/70">
                  Payment held in escrow. Funds will release to <strong>{selectedProduct.farmerName}</strong> upon crop delivery confirmation.
                </p>
                <button onClick={() => setShowPaymentModal(false)} className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2">Close</button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 space-y-1">
                  <p className="font-bold">{selectedProduct.cropName}</p>
                  <p className="text-[11px] text-emerald-900/60 dark:text-white/60">Seller: {selectedProduct.farmerName}</p>
                  <div className="flex justify-between pt-2 border-t border-emerald-500/10 font-bold">
                    <span>Total Amount (20 kg min):</span>
                    <span className="text-emerald-700 dark:text-emerald-400">₹600</span>
                  </div>
                  <p className="text-[9px] text-emerald-800 dark:text-emerald-400 font-semibold pt-0.5">Platform Commission (2.5%): Included</p>
                </div>

                <div className="text-center p-3 bg-white dark:bg-white/5 rounded-2xl border border-emerald-500/20 space-y-2">
                  <QrCode className="w-20 h-20 mx-auto text-emerald-700 dark:text-emerald-400" />
                  <p className="text-[10px] font-bold text-emerald-900/60 dark:text-white/60">Scan with GPay / PhonePe / Paytm UPI</p>
                </div>

                <button
                  onClick={() => setPaymentSuccess(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" /> Complete Direct UPI Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
