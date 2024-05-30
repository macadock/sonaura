export const NewsletterSignUp = () => {
  return (
    <div className="bg-primary w-full text-white rounded-lg p-4 md:px-8 md:py-14 text-center flex flex-col justify-center items-center gap-6 xl:max-w-7xl xl:m-auto">
      <h2 className="text-xl md:text-3xl">
        Inscrivez-vous à la newsletter Sonaura
      </h2>
      <p className="text-base md:text-xl">Tenez-vous informé</p>

      <form className="flex gap-2 w-full md:w-1/2">
        <input
          type="email"
          placeholder="Votre adresse email"
          className="border border-white text-sm md:text-base p-4 rounded-lg w-full text-white placeholder:text-white bg-primary"
        />
      </form>
    </div>
  );
};
