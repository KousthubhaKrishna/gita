# Artwork

The app ships two image sets, chosen in Settings. The files are **not committed** to this repository.
Download each from the source below, crop or resize to roughly the listed size, save as WebP, and
place it at the given path. `src/data/art.ts` maps these files to chapters.

All works are public domain, CC0, or Creative Commons. CC BY and CC BY-SA images require the credit
shown here to travel with any build; the app displays it in the About screen.

## `assets/art/` — Indian miniature paintings (portrait, about 1120×1400)

| File | Work | Source / licence |
|---|---|---|
| `upadesh.webp` | Krishna instructs Arjuna, Kashmir school, 19th c. | Google Cultural Institute via Wikimedia Commons, public domain |
| `chariot.webp` | Krishna and Arjuna on the chariot, 19th c. | Wikimedia Commons, public domain |
| `kurukshetra.webp` | Arjuna and his charioteer Krishna confront Karna, Himachal/Jammu, c. 1820 | Wikimedia Commons, public domain |
| `manuscript.webp` | Illustrated Bhagavad Gita manuscript, verses 1.20–21, 19th c. | Wikimedia Commons, public domain |
| `counsel.webp` | Arjuna chooses Krishna, Himachal Pradesh, 18th–19th c. | Wikimedia Commons, public domain |
| `grove.webp` | Radha and Krishna walk in a flowering grove, Kota, c. 1720 | The Met Open Access, CC0 |
| `shrinathji.webp` | Krishna in the form of Shri Nathji, Nathdwara, c. 1840 | The Met Open Access, CC0 |
| `kaliya.webp` | Krishna subduing Kaliya, Tirupati, 19th c. | The Met Open Access, CC0 |
| `cosmic.webp` | Navagunjara, a universal form of Krishna, Jodhpur, c. 1835 | The Met Open Access, CC0 |
| `govardhan.webp` | Krishna lifting Mount Govardhana, Kangra, 18th c. | Wikimedia Commons, public domain |

## `assets/art/devotional/` — photographs and Ravi Varma prints (landscape, about 1280×960)

| File | Subject | Credit / licence |
|---|---|---|
| `upadesh.webp` | Krishna–Arjuna chariot memorial, Kurukshetra | Photo: Tsevang, CC BY-SA 4.0, Wikimedia Commons |
| `chariot.webp` | Krishna's chariot at Brahma Sarovar, Kurukshetra | Photo: Gagan.leonidas, CC BY-SA 3.0, Wikimedia Commons |
| `kurukshetra.webp` | Krishna and Arjuna statue, Rishikesh | Photo: Bodhisattwa, CC BY-SA 3.0, Wikimedia Commons |
| `manuscript.webp` | Lamp offering (deeparadhana) | Photo: Ara Basu, CC BY-SA 4.0, Wikimedia Commons |
| `counsel.webp` | Krishna as Envoy, Raja Ravi Varma | Wikimedia Commons, public domain |
| `grove.webp` | Muralidhara, Janmashtami decoration | Photo: Sudarshana from Bangalore, CC BY 2.0, Wikimedia Commons |
| `shrinathji.webp` | Sri Radha Krishna, ISKCON Chennai | Photo: Rasnaboy, CC BY-SA 3.0, Wikimedia Commons |
| `kaliya.webp` | Lotus | Photo: Hong Zhang, CC0, Wikimedia Commons |
| `cosmic.webp` | Vishvarupa mural | Mural photo: T.sujatha, CC BY-SA 3.0, Wikimedia Commons |
| `govardhan.webp` | Vishnu on Garuda, Ravi Varma studio, c. 1910s | Wikimedia Commons, public domain |

Tip: `cwebp -q 82 -resize 1120 0 in.jpg -o upadesh.webp` produces files close to the originals used.
