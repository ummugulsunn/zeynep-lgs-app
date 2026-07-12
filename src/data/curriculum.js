export const SUBJECTS = {
  turkce: {
    id: 'turkce',
    name: 'Türkçe',
    icon: '📘',
    color: '#FF9BBE',
    nodes: [
      { id:'t1', title:'Sözcükte Anlam - 1', desc:'Gerçek, mecaz ve terim anlamları keşfediyoruz.', subtopics:['Gerçek Anlam','Mecaz Anlam','Terim Anlam'], quiz:[{q:'"Sıcak" kelimesi hangisinde mecazdır?', opts:['Çorba çok sıcaktı.','Bizi sıcak karşıladı.','Sıcak suyla yıkandı.','Hava bugün sıcak.'], answer:1}] },
      { id:'t2', title:'Sözcükte Anlam - 2', desc:'Kelimeler arası ilişkiler ve deyimler.', subtopics:['Eş Anlam','Zıt Anlam','Deyimler ve Atasözleri'], quiz:[{q:'"Ak-Kara" kelimeleri arasındaki ilişki nedir?', opts:['Eş Anlamlı','Zıt Anlamlı','Sesteş','Yakın Anlamlı'], answer:1}] },
      { id:'t3', title:'Cümlede Anlam - 1', desc:'Cümlelerin bize ne anlattığını buluyoruz.', subtopics:['Neden-Sonuç Cümleleri','Amaç-Sonuç Cümleleri'], quiz:[{q:'"Sınavı kazanmak için çok çalıştı." cümlesi ne bildirir?', opts:['Neden-sonuç','Koşul','Amaç-sonuç','Öznel'], answer:2}] },
      { id:'t4', title:'Cümlede Anlam - 2', desc:'Kişisel görüşler ve gizli anlamlar.', subtopics:['Öznel Yargılar','Nesnel Yargılar','Örtülü Anlam'], quiz:[{q:'Hangisi nesnel bir yargıdır?', opts:['En güzel renk mavidir.','Türkiye\'nin başkenti Ankara\'dır.','Bence bu film çok sıkıcı.','Gülmek insana iyi gelir.'], answer:1}] },
      { id:'t5', title:'Paragraf - Ana Düşünce', desc:'Metnin bize vermek istediği asıl mesaj.', subtopics:['Ana Düşünce Bulma','Konu Belirleme','Başlık Seçme'], quiz:[{q:'Ana düşünce genellikle metnin neresinde bulunur?', opts:['Sadece başta','Sadece sonda','Hiçbir yerde','Bütününe sindirilmiş veya sonda'], answer:3}] },
      { id:'t6', title:'Paragraf - Yapı', desc:'Metnin iskeletini oluşturuyoruz.', subtopics:['Giriş, Gelişme, Sonuç','Paragraf Tamamlama','Düşüncenin Akışını Bozan Cümle'], quiz:[{q:'"Kısacası, özetle" gibi ifadeler paragrafın hangi bölümünde yer alır?', opts:['Giriş','Gelişme','Sonuç','Hiçbiri'], answer:2}] },
      { id:'t7', title:'Fiilimsiler (Eylemsi)', desc:'Fiil gibi görünen ama artık fiil olmayan kelimeler.', subtopics:['İsim-fiil (Mayışmak)','Sıfat-fiil (Anasımezardikecekmiş)','Zarf-fiil (Kenyalı...)'], quiz:[{q:'"Gülmek ona çok yakışıyor." cümlesindeki fiilimsinin türü nedir?', opts:['İsim-fiil','Sıfat-fiil','Zarf-fiil','Çekimli fiil'], answer:0}] },
      { id:'t8', title:'Cümlenin Ögeleri', desc:'Cümlenin yapı taşları.', subtopics:['Yüklem ve Özne','Nesne (Belirtili/Belirtisiz)','Yer Tamlayıcısı ve Zarf Tamlayıcısı'], quiz:[{q:'Cümlenin temel ögeleri hangileridir?', opts:['Özne ve Yüklem','Nesne ve Yüklem','Özne ve Nesne','Tümleç ve Yüklem'], answer:0}] },
      { id:'t9', title:'Cümle Türleri', desc:'Cümleleri yüklemine, yapısına ve anlamına göre inceliyoruz.', subtopics:['İsim ve Fiil Cümleleri','Kurallı ve Devrik Cümleler','Anlamına Göre Cümleler'], quiz:[{q:'Yüklemi sonda olmayan cümleye ne denir?', opts:['Kurallı','Devrik','Eksiltili','İsim'], answer:1}] },
      { id:'t10', title:'Yazım Kuralları', desc:'Doğru yazım kuratır!', subtopics:['Büyük Harflerin Kullanımı','De/Ki/Mi Yazımı','Sayıların ve Kısaltmaların Yazımı'], quiz:[{q:'Hangisinin yazımı yanlıştır?', opts:['Herkes','Yalnış','Kirpik','Şoför'], answer:1}] },
      { id:'t11', title:'Noktalama İşaretleri', desc:'Cümlenin trafik işaretleri.', subtopics:['Nokta ve Virgül','Noktalı Virgül ve İki Nokta','Soru ve Ünlem'], quiz:[{q:'Açıklama yapılacak cümlenin sonuna hangi işaret konur?', opts:['Virgül','Nokta','İki Nokta','Noktalı Virgül'], answer:2}] },
      { id:'t12', title:'Metin Türleri ve Sanatlar', desc:'Edebiyat dünyasına giriş.', subtopics:['Hikaye, Roman, Masal','Söz Sanatları (Kişileştirme, Benzetme)','Görsel ve Sözel Mantık'], quiz:[{q:'"Güneş bize gülümsüyordu." cümlesindeki söz sanatı nedir?', opts:['Abartma','Kişileştirme','Benzetme','Tezat'], answer:1}] }
    ]
  },
  matematik7: {
    id: 'matematik7',
    name: 'Matematik (7. Sınıf)',
    icon: '🧮',
    color: '#E9C46A',
    nodes: [
      { id:'m7_1', title:'Tam Sayılarla İşlemler', desc:'Tam sayılarla toplama, çıkarma, çarpma ve bölme işlemleri.', subtopics:['Tam Sayılarla Toplama ve Çıkarma','Tam Sayılarla Çarpma ve Bölme','Tam Sayıların Kuvvetleri','Tam Sayı Problemleri'], quiz:[{q:'-8 + (-3) x (-2) = ?', opts:['-14','-2','14','2'], answer:1}] },
      { id:'m7_2', title:'Rasyonel Sayılar', desc:'Rasyonel sayıları tanıma, sayı doğrusunda gösterme ve ondalık gösterim.', subtopics:['Rasyonel Sayıları Sayı Doğrusunda Gösterme','Ondalık Gösterim ve Devirli Ondalık Sayılar','Rasyonel Sayıları Karşılaştırma'], quiz:[{q:'1/5 rasyonel sayısının ondalık gösterimi hangisidir?', opts:['0,1','0,2','0,5','1,5'], answer:1}] },
      { id:'m7_3', title:'Rasyonel Sayılarla İşlemler', desc:'Rasyonel sayılarla toplama, çıkarma, çarpma, bölme ve çok adımlı işlemler.', subtopics:['Rasyonel Sayılarla Toplama ve Çıkarma','Rasyonel Sayılarla Çarpma ve Bölme','Rasyonel Sayıların Karesi ve Küpü','Çok Adımlı İşlemler ve Problemler'], quiz:[{q:'(1/2) x (2/3) + 1/3 = ?', opts:['1/2','2/3','1','5/6'], answer:1}] },
      { id:'m7_4', title:'Cebirsel İfadeler', desc:'Cebirsel ifadelerle toplama, çıkarma, çarpma ve örüntüler.', subtopics:['Cebirsel İfadelerle Toplama ve Çıkarma','Cebirsel İfadelerle Çarpma','Sayı Örüntüleri'], quiz:[{q:'3x - (x - 2) cebirsel ifadesinin en sade hali nedir?', opts:['2x - 2','2x + 2','4x - 2','4x + 2'], answer:1}] },
      { id:'m7_5', title:'Eşitlik ve Denklem', desc:'Eşitliğin korunumu ve birinci dereceden bir bilinmeyenli denklemler.', subtopics:['Eşitliğin Korunumu İlkesi','Birinci Dereceden Bir Bilinmeyenli Denklem Çözme','Denklem Kurma Problemleri'], quiz:[{q:'3x + 5 = 20 ise x kaçtır?', opts:['3','4','5','6'], answer:2}] },
      { id:'m7_6', title:'Oran ve Orantı', desc:'Oran, orantı, doğru orantı ve ters orantı kavramları.', subtopics:['Oran ve Orantıyı Tanıma','Doğru Orantı ve Orantı Sabiti','Ters Orantı','Oran ve Orantı Problemleri'], quiz:[{q:'A ile B doğru orantılıdır. A=6 iken B=10 ise, A=18 iken B kaç olur?', opts:['20','24','30','36'], answer:2}] },
      { id:'m7_7', title:'Yüzdeler', desc:'Bir çokluğun yüzdesini hesaplama ve yüzde problemleri.', subtopics:['Bir Çokluğun Belirli Bir Yüzdesini Bulma','Bir Yüzdesi Verilen Çokluğu Bulma','Faiz, KDV ve İndirim Problemleri'], quiz:[{q:'120 sayısının %15\'i kaçtır?', opts:['12','15','18','20'], answer:2}] },
      { id:'m7_8', title:'Doğrular ve Açılar', desc:'Açıortay, paralel iki doğrunun bir kesenle yaptığı açılar.', subtopics:['Bir Açının Açıortayı','Paralel İki Doğru ve Bir Kesen','Yöndeş, İç Ters ve Dış Ters Açılar'], quiz:[{q:'Paralel iki doğruyu kesen bir doğrunun oluşturduğu yöndeş açılar için hangisi doğrudur?', opts:['Toplamları 180 derecedir','Ölçüleri eşittir','Birbirini 90 dereceye tamamlar','Biri dar diğeri geniş açıdır'], answer:1}] },
      { id:'m7_9', title:'Çokgenler', desc:'Düzgün çokgenler, açılar, köşegenler ve alan formülleri.', subtopics:['Düzgün Çokgenler ve Özellikleri','İç ve Dış Açılar Toplamı','Yamuk, Paralelkenar ve Eşkenar Dörtgenin Alanı'], quiz:[{q:'Düzgün bir altıgenin bir iç açısı kaç derecedir?', opts:['108','120','135','140'], answer:1}] },
      { id:'m7_10', title:'Çember ve Daire', desc:'Çemberde açılar, çemberin uzunluğu ve dairenin alanı.', subtopics:['Çemberde Merkez Açı ve Yaylar','Çemberin ve Çember Yayının Uzunluğu','Dairenin ve Daire Diliminin Alanı'], quiz:[{q:'Yarıçapı 5 cm olan bir dairenin alanı kaç cm²\'dir? (pi = 3 alınız)', opts:['30','50','75','150'], answer:2}] },
      { id:'m7_11', title:'Veri Analizi', desc:'Aritmetik ortalama, ortanca, tepe değer ve çizgi grafiği.', subtopics:['Aritmetik Ortalama, Medyan ve Mod','Verileri Uygun Grafiklerle Gösterme','Grafikler Arası Dönüşümler'], quiz:[{q:'Bir veri grubunda en çok tekrar eden değere ne ad verilir?', opts:['Aritmetik Ortalama','Tepe Değer (Mod)','Ortanca (Medyan)','Açıklık'], answer:1}] },
      { id:'m7_12', title:'Cisimlerin Farklı Yönlerden Görünümleri', desc:'Üç boyutlu cisimlerin iki boyutlu görünümleri.', subtopics:['Ön, Arka, Sağ, Sol ve Üstten Görünümler','Eş Küplerle Oluşturulan Yapılar'], quiz:[{q:'Eş küplerden oluşan bir yapının farklı yönlerden çizimlerinde kullanılan en temel yöntem hangisidir?', opts:['İki boyutlu iz düşüm çizimi','Perspektif çizimi','Perspektif boyama','İzometrik renklendirme'], answer:0}] }
    ]
  },
  matematik: {
    id: 'matematik',
    name: 'Matematik',
    icon: '📐',
    color: '#FFD166',
    nodes: [
      { id:'m1', title:'Hazırlık Kampı', desc:'7. Sınıf eksiklerini kapatıyoruz.', subtopics:['Tam sayılarla işlemler','Rasyonel sayılar','Denklemler','Oran ve Orantı'], quiz:[{q:'-5 + 3 = ?', opts:['-8','-2','2','8'], answer:1}] },
      { id:'m2', title:'Çarpanlar ve Katlar', desc:'Asal sayılar, EBOB ve EKOK.', subtopics:['Asal Çarpanlara Ayırma','EBOB Bulma','EKOK Bulma','Problemler'], quiz:[{q:'12 ve 18\'in EBOB\'u kaçtır?', opts:['3','6','9','36'], answer:1}] },
      { id:'m3', title:'Üslü İfadeler - 1', desc:'Üslü sayıların temel kuralları.', subtopics:['Pozitif ve Negatif Üsler','Üslü Sayılarda Çarpma','Üslü Sayılarda Bölme'], quiz:[{q:'2³ x 2² = ?', opts:['2⁵','2⁶','4⁵','4⁶'], answer:0}] },
      { id:'m4', title:'Üslü İfadeler - 2', desc:'Çok büyük ve çok küçük sayılar.', subtopics:['Ondalık Çözümleme','Bilimsel Gösterim'], quiz:[{q:'5.000.000 sayısının bilimsel gösterimi nedir?', opts:['5 x 10⁵','5 x 10⁶','50 x 10⁵','0.5 x 10⁷'], answer:1}] },
      { id:'m5', title:'Kareköklü İfadeler - 1', desc:'Kök dışına çıkarma ve işlemler.', subtopics:['Tam Kare Sayılar','Karekök Dışına Çıkarma','Toplama ve Çıkarma'], quiz:[{q:'√81 kaçtır?', opts:['7','8','9','10'], answer:2}] },
      { id:'m6', title:'Kareköklü İfadeler - 2', desc:'Çarpma, bölme ve yaklaşık değer.', subtopics:['Çarpma ve Bölme','Yaklaşık Değer Bulma','Ondalık İfadelerin Karekökü'], quiz:[{q:'√8 hangi iki tam sayı arasındadır?', opts:['1 ile 2','2 ile 3','3 ile 4','4 ile 5'], answer:1}] },
      { id:'m7', title:'Veri Analizi', desc:'Grafikleri okuma ve yorumlama.', subtopics:['Çizgi Grafiği','Sütun Grafiği','Daire Grafiği'], quiz:[{q:'Bir bütünü parçalara ayırarak göstermek için en uygun grafik türü hangisidir?', opts:['Sütun','Çizgi','Daire','Nokta'], answer:2}] },
      { id:'m8', title:'Olasılık', desc:'Olayların gerçekleşme şansı.', subtopics:['Olası Durumlar','Kesin ve İmkansız Olaylar','Olasılık Hesaplama'], quiz:[{q:'Bir zar atıldığında üst yüze 7 gelme olasılığı nedir?', opts:['1/6','1','0','1/2'], answer:2}] },
      { id:'m9', title:'Cebirsel İfadeler', desc:'Harfli ifadeler ve özdeşlikler.', subtopics:['Cebirsel İfadelerde İşlemler','Tam Kare Özdeşliği','İki Kare Farkı Özdeşliği'], quiz:[{q:'a² - b² açılımı hangisidir?', opts:['(a-b)²','(a+b)(a-b)','(a+b)²','a² + b²'], answer:1}] },
      { id:'m10', title:'Doğrusal Denklemler', desc:'Koordinat sistemi ve eğim.', subtopics:['Koordinat Sistemi','Doğru Grafikleri','Eğim'], quiz:[{q:'Orjin koordinatları nedir?', opts:['(1,1)','(0,1)','(1,0)','(0,0)'], answer:3}] },
      { id:'m11', title:'Eşitsizlikler', desc:'Büyüktür ve küçüktür dünyası.', subtopics:['Eşitsizlik Yazma','Sayı Doğrusunda Gösterme','Eşitsizlik Çözme'], quiz:[{q:'2x > 10 ise x en az hangi tam sayı olabilir?', opts:['4','5','6','7'], answer:2}] },
      { id:'m12', title:'Üçgenler - 1', desc:'Kenarortay, açıortay, yükseklik ve üçgen eşitsizliği.', subtopics:['Kenarortay ve Açıortay','Üçgenin Yüksekliği','Üçgen Eşitsizliği','Açı-Kenar İlişkileri'], quiz:[{q:'Üçgende açıortay ne işe yarar?', opts:['Açıyı iki eşit parçaya böler.','Kenarı iki eşit parçaya böler.','Yüksekliği bulur.','Alanı hesaplar.'], answer:0}] },
      { id:'m13', title:'Üçgenler - 2 (Pisagor)', desc:'Pisagor bağıntısı ve dik üçgenlerin sırları.', subtopics:['Dik Üçgen Yapısı','Pisagor Bağıntısı (a² + b² = c²)','Özel Dik Üçgenler (3-4-5 vb.)'], quiz:[{q:'Dik kenarları 6 ve 8 olan dik üçgenin hipotenüsü kaçtır?', opts:['9','10','12','14'], answer:1}] },
      { id:'m14', title:'Eşlik ve Benzerlik', desc:'Eşlik ve benzerlik kavramı, benzerlik oranı.', subtopics:['Eş Şekiller','Benzer Şekiller','Benzerlik Oranı (k)'], quiz:[{q:'Benzerlik oranı 2 olan iki şeklin çevreleri oranı kaçtır?', opts:['1','2','4','8'], answer:1}] },
      { id:'m15', title:'Dönüşüm Geometrisi', desc:'Öteleme, yansıma ve koordinat sistemi hareketleri.', subtopics:['Öteleme Hareketi','Yansıma Hareketi','Ötelemeli Yansıma'], quiz:[{q:'Bir şekil yansıtıldığında şeklin kendisi (boyutu) değişir mi?', opts:['Evet, büyür.','Hayır, değişmez.','Evet, küçülür.','Bazen değişir.'], answer:1}] },
      { id:'m16', title:'Geometrik Cisimler', desc:'Prizmalar, silindir, koni ve piramitler.', subtopics:['Dik Prizmalar','Dik Dairesel Silindir','Dik Piramitler','Dik Koni'], quiz:[{q:'Dik dairesel silindirin kaç tane dairesel tabanı vardır?', opts:['1','2','3','4'], answer:1}] }
    ]
  },
  fen: {
    id: 'fen',
    name: 'Fen Bilimleri',
    icon: '🧪',
    color: '#86E3CE',
    nodes: [
      { id:'f1', title:'Mevsimlerin Oluşumu', desc:'Dünya\'nın hareketleri ve eksen eğikliği.', subtopics:['Dünya\'nın Dönüşü ve Dolanımı','Eksen Eğikliğinin Etkileri'], quiz:[{q:'Mevsimlerin oluşumunun temel sebebi nedir?', opts:['Dünya\'nın Güneş\'e uzaklığı','Eksen eğikliği ve yıllık hareket','Dünya\'nın kendi etrafında dönmesi','Ay\'ın hareketleri'], answer:1}] },
      { id:'f2', title:'İklim ve Hava Hareketleri', desc:'Rüzgarlar, yağışlar ve iklim.', subtopics:['Hava Olayları (Rüzgar, Yağmur vb.)','İklim ve Hava Durumu Farkı'], quiz:[{q:'Geniş bir bölgede uzun yıllar boyunca gözlenen hava şartlarına ne denir?', opts:['Hava Durumu','İklim','Meteoroloji','Atmosfer'], answer:1}] },
      { id:'f3', title:'DNA ve Genetik Kod', desc:'Yaşamın şifresi.', subtopics:['DNA\'nın Yapısı (Nükleotidler)','DNA\'nın Kendini Eşlemesi'], quiz:[{q:'Adenin nükleotidinin karşısına daima hangi nükleotid gelir?', opts:['Timin','Guanin','Sitozin','Urasil'], answer:0}] },
      { id:'f4', title:'Kalıtım', desc:'Özelliklerimiz nesilden nesile nasıl geçer?', subtopics:['Karakterlerin Aktarımı (Çaprazlama)','Akraba Evliliğinin Sakıncaları'], quiz:[{q:'Kalıtım biliminin kurucusu kimdir?', opts:['Einstein','Mendel','Newton','Darwin'], answer:1}] },
      { id:'f5', title:'Mutasyon ve Modifikasyon', desc:'Genlerdeki ve dış görünüşteki değişimler.', subtopics:['Mutasyon Nedir?','Modifikasyon Nedir?','Adaptasyon ve Doğal Seçilim'], quiz:[{q:'Bronzlaşmak hangisine örnektir?', opts:['Mutasyon','Modifikasyon','Adaptasyon','Kalıtım'], answer:1}] },
      { id:'f6', title:'Katı ve Sıvı Basıncı', desc:'Yüzeye etki eden dik kuvvet.', subtopics:['Katı Basıncı','Sıvı Basıncı'], quiz:[{q:'Sıvı basıncı nelere bağlıdır?', opts:['Sıvının derinliğine ve yoğunluğuna','Sadece kabın şekline','Sıvının hacmine','Kabın rengine'], answer:0}] },
      { id:'f7', title:'Gaz Basıncı', desc:'Açık hava ve kapalı kaplardaki gazlar.', subtopics:['Açık Hava Basıncı (Toriçelli)','Kapalı Kaplarda Gaz Basıncı'], quiz:[{q:'Açık hava basıncını deniz seviyesinde kaç cmHg olarak ölçmüştür?', opts:['70','72','76','80'], answer:2}] },
      { id:'f8', title:'Periyodik Sistem', desc:'Elementlerin dünyası.', subtopics:['Periyodik Cetvelin Yapısı','Metaller, Ametaller, Yarı Metaller'], quiz:[{q:'Periyodik tabloda yatay sıralara ne ad verilir?', opts:['Grup','Periyot','Blok','Sınıf'], answer:1}] },
      { id:'f9', title:'Fiziksel ve Kimyasal Değişimler', desc:'Maddenin yapısındaki değişimler.', subtopics:['Fiziksel Değişimler','Kimyasal Değişimler','Kimyasal Tepkimeler'], quiz:[{q:'Kağıdın yanması nasıl bir değişimdir?', opts:['Fiziksel','Kimyasal','Biyolojik','Mekanik'], answer:1}] },
      { id:'f10', title:'Asitler ve Bazlar', desc:'Tatlı ve acı kimyasallar.', subtopics:['Asit ve Bazların Özellikleri','pH Cetveli','Asit Yağmurları'], quiz:[{q:'Limon suyu pH cetvelinde hangi aralıktadır?', opts:['0-7 (Asit)','7 (Nötr)','7-14 (Baz)','Yoktur'], answer:0}] },
      { id:'f11', title:'Basit Makineler', desc:'İşimizi kolaylaştıran aletler.', subtopics:['Kaldıraçlar ve Makaralar','Eğik Düzlem, Çıkrık, Dişliler'], quiz:[{q:'Basit makinelerde hangisinden KESİNLİKLE kazanç sağlanmaz?', opts:['Kuvvetten','Yoldan','İş ve Enerjiden','Zamandan'], answer:2}] },
      { id:'f12', title:'Elektrik ve Enerji', desc:'Elektrik yükleri ve dönüşümler.', subtopics:['Elektriklenme Çeşitleri','Fotosentez ve Solunum','Madde Döngüleri'], quiz:[{q:'Bitkilerin ışık enerjisini besin enerjisine çevirmesine ne denir?', opts:['Solunum','Terleme','Fotosentez','Boşaltım'], answer:2}] }
    ]
  },
  inkilap: {
    id: 'inkilap',
    name: 'İnkılap Tarihi',
    icon: '🌍',
    color: '#FFB885',
    nodes: [
      { id:'i1', title:'Uyanan Avrupa, Sarsılan Osmanlı', desc:'20. Yüzyıl başlarında Osmanlı Devleti.', subtopics:['Sanayi İnkılabı ve Sömürgecilik','Fransız İhtilali ve Milliyetçilik','Osmanlıyı Kurtarma Akımları'], quiz:[{q:'Osmanlıyı dağılmaktan kurtarmak için öne sürülen "herkesi eşit sayma" fikri hangisidir?', opts:['İslamcılık','Osmanlıcılık','Türkçülük','Batıcılık'], answer:1}] },
      { id:'i2', title:'Mustafa Kemal\'in Çocukluğu', desc:'Bir liderin doğuşu.', subtopics:['Selanik\'in Sosyal ve Kültürel Yapısı','Eğitim Hayatı (Okullar)'], quiz:[{q:'Mustafa Kemal\'in gittiği İLK okul hangisidir?', opts:['Şemsi Efendi Mektebi','Mahalle Mektebi','Mülkiye Rüştiyesi','Askeri Rüştiye'], answer:1}] },
      { id:'i3', title:'Askerlik Hayatı ve İlk Savaşlar', desc:'Mustafa Kemal cephede.', subtopics:['Şam Görevi ve Trablusgarp Savaşı','Balkan Savaşları'], quiz:[{q:'Mustafa Kemal\'in emperyalizme karşı İLK savaşı hangisidir?', opts:['Trablusgarp Savaşı','I. Balkan Savaşı','Çanakkale Savaşı','Kurtuluş Savaşı'], answer:0}] },
      { id:'i4', title:'I. Dünya Savaşı', desc:'Dünyayı saran ateş.', subtopics:['Savaşın Nedenleri','Osmanlı\'nın Savaşa Girmesi','Çanakkale ve Diğer Cepheler'], quiz:[{q:'Osmanlı\'nın I. Dünya Savaşı\'nda zafer kazandığı TEK cephe hangisidir?', opts:['Kafkas','Çanakkale','Kanal','Suriye'], answer:1}] },
      { id:'i5', title:'Mondros ve Cemiyetler', desc:'İşgaller ve ilk tepkiler.', subtopics:['Mondros Ateşkes Antlaşması','İşgaller ve Kuvâ-yı Millîye','Yararlı ve Zararlı Cemiyetler'], quiz:[{q:'Halkın işgallere karşı kendi imkanlarıyla kurduğu silahlı direniş örgütüne ne denir?', opts:['Düzenli Ordu','Kuvâ-yı Millîye','Temsil Heyeti','Milis Güçler'], answer:1}] },
      { id:'i6', title:'Kurtuluşa Hazırlık', desc:'Genelgeler dönemi.', subtopics:['Havza ve Amasya Genelgeleri','Milli Mücadelenin Amacı, Yöntemi'], quiz:[{q:'Milli Mücadelenin gerekçesi, amacı ve yöntemi İLK defa nerede belirtilmiştir?', opts:['Havza Genelgesi','Amasya Genelgesi','Erzurum Kongresi','Sivas Kongresi'], answer:1}] },
      { id:'i7', title:'Kongreler Dönemi', desc:'Milletin iradesi toplanıyor.', subtopics:['Erzurum Kongresi','Sivas Kongresi ve Amasya Görüşmeleri'], quiz:[{q:'Tüm milli cemiyetlerin "Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti" adı altında birleştirildiği yer?', opts:['Erzurum','Sivas','Amasya','Ankara'], answer:1}] },
      { id:'i8', title:'TBMM\'nin Açılışı', desc:'Egemenlik kayıtsız şartsız milletindir.', subtopics:['TBMM\'nin Açılması','TBMM\'ye Karşı Ayaklanmalar','Sevr Antlaşması'], quiz:[{q:'TBMM\'ye karşı çıkan isyanları bastırmak için çıkarılan kanun hangisidir?', opts:['Tekalif-i Milliye','Hıyanet-i Vataniye','Teşkilat-ı Esasiye','Takrir-i Sükun'], answer:1}] },
      { id:'i9', title:'Doğu ve Güney Cepheleri', desc:'İlk zaferler.', subtopics:['Doğu Cephesi (Ermenilerle Savaş)','Güney Cephesi (Fransızlarla Savaş)'], quiz:[{q:'Doğu Cephesinde Ermenileri yenerek Gümrü Antlaşmasını imzalayan komutan kimdir?', opts:['Mustafa Kemal','İsmet İnönü','Kazım Karabekir','Fevzi Çakmak'], answer:2}] },
      { id:'i10', title:'Batı Cephesi', desc:'Düzenli ordunun destanı.', subtopics:['I. ve II. İnönü Savaşları','Kütahya-Eskişehir ve Sakarya','Büyük Taarruz'], quiz:[{q:'"Hattı müdafaa yoktur, sathı müdafaa vardır." sözü hangi savaşta söylenmiştir?', opts:['I. İnönü','Sakarya','Büyük Taarruz','Çanakkale'], answer:1}] },
      { id:'i11', title:'Mudanya ve Lozan', desc:'Diplomatik zaferler.', subtopics:['Mudanya Ateşkes Antlaşması','Lozan Barış Antlaşması'], quiz:[{q:'Lozan\'da Türk heyetine kim başkanlık etmiştir?', opts:['Mustafa Kemal','İsmet İnönü','Rauf Orbay','Fethi Okyar'], answer:1}] },
      { id:'i12', title:'Atatürk İnkılapları', desc:'Çağdaş Türkiye\'nin temelleri.', subtopics:['Siyasi Alanda İnkılaplar (Saltanatın Kaldırılması vs.)','Eğitim ve Hukuk Alanında İnkılaplar','Ekonomi Alanında Gelişmeler'], quiz:[{q:'Hukuk alanında laikleşmenin en önemli adımı olarak kabul edilen kanun hangisidir?', opts:['Tevhid-i Tedrisat','Medeni Kanun','Soyadı Kanunu','Tekke ve Zaviyelerin Kapatılması'], answer:1}] }
    ]
  },
  ingilizce: {
    id: 'ingilizce',
    name: 'İngilizce',
    icon: '💬',
    color: '#B593FF',
    nodes: [
      { id:'e1', title:'Unit 1: Friendship', desc:'Arkadaşlık kelimeleri ve teklifler.', subtopics:['Accepting and Refusing','Making Apologies','Personal Traits'], quiz:[{q:'"Would you like to come to my party?" sorusuna olumlu yanıt hangisidir?', opts:['I\'m sorry, I can\'t.','I have to study.','That sounds awesome!','Maybe later.'], answer:2}] },
      { id:'e2', title:'Unit 2: Teen Life', desc:'Gençlerin yaşamı ve tercihleri.', subtopics:['Expressing Preferences (Prefer)','Stating Personal Opinions','Daily Routines'], quiz:[{q:'"I prefer reading books ______ watching TV." boşluğa ne gelir?', opts:['than','to','at','for'], answer:1}] },
      { id:'e3', title:'Unit 3: In the Kitchen', desc:'Mutfak kelimeleri ve yemek tarifleri.', subtopics:['Cooking Methods','Describing a Process (First, Next, Finally)'], quiz:[{q:'Patatesleri suda kaynatarak pişirmek hangi kelimeyle ifade edilir?', opts:['Fry','Bake','Boil','Grill'], answer:2}] },
      { id:'e4', title:'Unit 4: On the Phone', desc:'Telefonda konuşma kalıpları.', subtopics:['Phone Conversations','Stating Decisions at the Moment (Will)'], quiz:[{q:'"Hold on a minute, please." cümlesinin anlamı nedir?', opts:['Telefonu kapat.','Bir dakika bekle lütfen.','Numara yanlış.','Mesaj bırak.'], answer:1}] },
      { id:'e5', title:'Unit 5: The Internet', desc:'İnternet alışkanlıkları ve terimler.', subtopics:['Internet Vocabulary','Internet Habits'], quiz:[{q:'Bir dosyayı internetten bilgisayarına indirmek nedir?', opts:['Upload','Download','Log in','Delete'], answer:1}] },
      { id:'e6', title:'Unit 6: Adventures', desc:'Macera sporları ve karşılaştırmalar.', subtopics:['Extreme Sports','Comparisons (More, -er)'], quiz:[{q:'"Bungee jumping is ______ than cycling." boşluğa ne gelir?', opts:['more dangerous','dangerous','most dangerous','danger'], answer:0}] },
      { id:'e7', title:'Unit 7: Tourism', desc:'Tatil çeşitleri ve deneyimler.', subtopics:['Tourist Attractions','Talking about Experiences (Present Perfect)'], quiz:[{q:'"Have you ever ______ to Paris?"', opts:['go','went','been','going'], answer:2}] },
      { id:'e8', title:'Unit 8: Chores', desc:'Ev işleri ve sorumluluklar.', subtopics:['Household Chores','Expressing Obligations (Must/Have to)'], quiz:[{q:'Çamaşır yıkamak İngilizce\'de nasıl söylenir?', opts:['Do the laundry','Make the bed','Do the ironing','Set the table'], answer:0}] },
      { id:'e9', title:'Unit 9: Science', desc:'Bilimsel gelişmeler ve mucitler.', subtopics:['Scientific Discoveries','Talking about Past Events'], quiz:[{q:'Alexander Fleming ______ penicillin.', opts:['discover','discovers','discovered','discovering'], answer:2}] },
      { id:'e10', title:'Unit 10: Natural Forces', desc:'Doğal afetler.', subtopics:['Natural Disasters','Giving Reasons'], quiz:[{q:'Yerin sarsılması olayına (Deprem) ne ad verilir?', opts:['Flood','Drought','Earthquake','Avalanche'], answer:2}] }
    ]
  },
  din: {
    id: 'din',
    name: 'Din Kültürü',
    icon: '🕌',
    color: '#5C8A6A',
    nodes: [
      { id:'d1', title:'Kader İnancı - 1', desc:'Kader ve Kaza kavramları.', subtopics:['Kader ve Kaza Nedir?','Evrendeki Yasalar (Sünnetullah)'], quiz:[{q:'Allah\'ın her şeyi önceden bilip takdir etmesine ne denir?', opts:['Kaza','Kader','Tevekkül','Sünnetullah'], answer:1}] },
      { id:'d2', title:'Kader İnancı - 2', desc:'İrade, emek ve tevekkül.', subtopics:['İnsanın İradesi (Cüzi İrade)','Emek, Rızık ve Ecel','Tevekkül İnancı'], quiz:[{q:'Gerekli tüm çabayı gösterdikten sonra sonucu Allah\'a bırakmaya ne denir?', opts:['Tefekkür','Tevekkül','Kaza','Sadaka'], answer:1}] },
      { id:'d3', title:'Zekat ve Sadaka - 1', desc:'Yardımlaşmanın önemi.', subtopics:['Zekat Nedir, Kimlere Verilir?','Nisap Miktarı'], quiz:[{q:'Dinen zengin sayılmak için gereken minimum mal miktarına ne denir?', opts:['Nisap','Fitre','Öşür','Fidye'], answer:0}] },
      { id:'d4', title:'Zekat ve Sadaka - 2', desc:'Diğer yardımlaşma türleri.', subtopics:['Sadaka ve Sadaka-i Cariye','Fıtır Sadakası (Fitre)'], quiz:[{q:'İnsan öldükten sonra da sevap kazandıran kalıcı sadakaya ne denir?', opts:['Fıtır','Zekat','Sadaka-i Cariye','Nafile'], answer:2}] },
      { id:'d5', title:'Din ve Hayat', desc:'Dinin amacı ve temel haklar.', subtopics:['Dinin Gayesi','Zarurat-ı Diniyye (Dinin Korunmasını İstediği 5 Şey)'], quiz:[{q:'Hangisi dinin korunmasını emrettiği temel esaslardan biri DEĞİLDİR?', opts:['Canın korunması','Malın korunması','Aklın korunması','Makamın korunması'], answer:3}] },
      { id:'d6', title:'Hz. Muhammed\'in Örnekliği - 1', desc:'Peygamberimizin ahlakı.', subtopics:['Doğruluğu ve Güvenilirliği (El-Emin)','Merhameti ve Affediciliği'], quiz:[{q:'Hz. Muhammed\'e Mekkelilerin taktığı "Güvenilir" anlamına gelen lakap nedir?', opts:['Muhammed\'ül Emin','Sıddık','Faruk','Halilullah'], answer:0}] },
      { id:'d7', title:'Hz. Muhammed\'in Örnekliği - 2', desc:'Peygamberimizin diğer özellikleri.', subtopics:['Adaleti ve Hakkı Gözetmesi','İstişareye (Danışmaya) Önem Vermesi'], quiz:[{q:'Hz. Muhammed\'in kararlar alırken arkadaşlarına danışmasına ne ad verilir?', opts:['Tebliğ','İstişare','Tevekkül','İtaat'], answer:1}] },
      { id:'d8', title:'Kur\'an-ı Kerim', desc:'Kutsal kitabımız.', subtopics:['Kur\'an\'ın Ana Konuları','Kur\'an\'ın Temel Özellikleri'], quiz:[{q:'Hangisi Kur\'an\'ın ana konularından biri değildir?', opts:['İnanç (Akaid)','İbadet','Ahlak','Fizik kuralları'], answer:3}] }
    ]
  }
};
