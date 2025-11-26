export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-wine/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6 text-shadow-gold animate-fade-in-right">
              О нас
            </h2>
            <div className="space-y-4 text-cream/90 leading-relaxed">
              <p className="text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Наш ресторан расположен в историческом здании на Лесной улице, где всё пропитано духом творческих идей и финансового успеха. История Дома начинается с биржевой артели, когда здание принадлежало одному из самых богатых предпринимателей Имперской России — барону фон Мекку. Здесь, в центре московской деловой жизни, закладывались основы богатства и успеха.
              </p>
              <p className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                Позднее, дом стал местом притяжения творческой и актерской интеллигенции молодого советского государства, и этот переход от коммерческого успеха к творческому наследию добавил ещё одну важную грань атмосферы. Дом вобрал в себя не только дух финансовой состоятельности, но и атмосферу творчества и вдохновения, которая продолжает жить и в наши дни.
              </p>
              <p className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                В нашем ресторане каждый уголок, от антикварных предметов до уникального паркета 1913 года, отражает слияние исторического наследия и современного искусства. Меню, составленное из натуральных продуктов собственного изготовления, порадует ценителей настоящего вкуса, а авторские коктейли и пельменная карта удивят даже самых взыскательных гурманов.
              </p>
              <p className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
                «Бессонница» — это пространство, где рождаются идеи и где можно наслаждаться атмосферой творчества, вдохновения и гастрономических удовольствий. Мы создали место, которое идеально подходит как для приватных встреч, так и для творческих событий, вдохновляясь историей Дома и современными кулинарными тенденциями.
              </p>
              <p className="animate-slide-up" style={{ animationDelay: "0.9s" }}>
                Добро пожаловать в место, где встречаются успех и вдохновение.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
