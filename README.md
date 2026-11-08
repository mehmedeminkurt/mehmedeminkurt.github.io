# mehmedeminkurt.github.io

Mehmed Emin Kurt'un kişisel web sitesi ve interaktif OtoGuard sipariş teslimat simülatörü.

Canlı site: [mehmedeminkurt.github.io](https://mehmedeminkurt.github.io)

---

## 🎯 Sitenin Amacı ve Özellikleri

- **İnteraktif Teslimat Simülatörü:** Ziyaretçilerin test lisans anahtarı girerek arka planda dönen doğrulama, sipariş eşleme, IMAP e-posta kodu tarama ve tek kullanımlık şifre (OTP) iletim aşamalarını adım adım ve gerçek zamanlı terminal simülasyonuyla izlemesini sağlar.
- **Sıfır Harici Çalışma Zamanı Bağımlılığı (Zero Runtime Dependencies):** Herhangi bir UI framework'ü veya ağır harici kütüphane kullanılmadan; saf Vanilla JavaScript (ES Modules), modern CSS ve SVG ikonlar ile sıfırdan geliştirilmiştir.
- **Çift Dilli Yapı (i18n):** Türkçe ve İngilizce dilleri arasında sayfa yenilenmeden, DOM attribute'ları (`data-i18n`) ve istemci taraflı sözlük aracılığıyla anlık geçiş.
- **Erişilebilirlik ve Yüksek Performans:** Lighthouse denetimlerinde %100 Best Practices, %100 SEO, 97+ Erişilebilirlik ve 96+ Performans standartlarına göre optimize edilmiştir.
- **Yerel Barındırılan Tipografi:** Harici Google Fonts CDN çağrısı yapılmaz; tüm `Familjen Grotesk`, `Geist Sans`, `Geist Mono` ve `Source Serif 4` fontları WOFF2 formatında yerel olarak barındırılır ve `preload` ile servis edilir.

---

## 🔬 Simülatör Nasıl Çalışır?

`demos.js` içerisinde yer alan simülasyon mantığı olay güdümlü (event-driven) bir sonlu durum makinesi (finite state machine) olarak kurgulanmıştır:

1. **Anahtar Doğrulama (Key Validation):** Kullanıcı arayüze bir anahtar girdiğinde `validateKey()` fonksiyonu anahtar biçimini denetler.
2. **Adım Adım İzleme (Step-by-Step Pipeline):**
   - **Adım 1 — İstek Doğrulama:** Anahtarın veritabanındaki varlığı, kullanım durumu ve mağaza eşleşmesi kontrol edilir.
   - **Adım 2 — Sipariş ve Mağaza İzolasyonu:** Prisma Client Extension benzeri sanal bir tenant filtresi ile mağazanın izole verisi çekilir.
   - **Adım 3 — IMAP / E-posta Dinleme:** Güvenli IMAP bağlantısı üzerinden tek kullanımlık doğrulama kodunun (Steam Guard vb.) posta kutusuna düşüşü simüle edilir.
   - **Adım 4 — Teslimat & Kod Tamamlama:** Kod ayrıştırılır, tek kullanımlık olarak işaretlenir ve istemci ekranına teslim edilir.
3. **Canlı Terminal İzleyici (Terminal Trace):** Her adımda üretilen loglar, simüle edilmiş milisaniye gecikmeleriyle gerçekçi bir sunucu terminal çıktısı formatında DOM'a basılır.

---

## 📁 Dosya Yapısı

```text
mehmedeminkurt.github.io/
├── index.html              # Semantik tek sayfa HTML5 yapısı, meta/SEO ve OpenGraph etiketleri
├── style.css               # Modern CSS (CSS custom properties, clamp responsive tipografi, grid/flexbox)
├── fonts.css               # Yerel font @font-face tanımları
├── main.js                 # Dil değiştirici (TR/EN i18n motoru), yumuşak kaydırma ve temel etkileşimler
├── demos.js                # OtoGuard teslimat akışı ve güvenlik adımları simülatör motoru
├── 404.html                # GitHub Pages özel 404 sayfası
├── robots.txt              # Arama motoru tarama kuralları
├── sitemap.xml             # Site haritası
├── assets/                 # Görseller, OG grafiği ve Mehmed-Emin-Kurt-CV.pdf
└── fonts/                  # WOFF2 formatında self-hosted font dosyaları
```

---

## 🚀 Yerel Olarak Çalıştırma

Statik bir web sitesi olduğundan herhangi bir derleme (build) adımı gerektirmez. Dosyaları yerel bir HTTP sunucusu üzerinden çalıştırmak yeterlidir:

### Python 3 ile:
```bash
python -m http.server 8000
```

### Node.js (npx) ile:
```bash
npx serve .
```

Tarayıcınızda `http://localhost:8000` adresini açarak siteyi ve simülatörü yerel ortamda inceleyebilirsiniz.
