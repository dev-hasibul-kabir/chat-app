import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PaperPlaneAnimation = () => {
  return DotLottieReact({
    src: "https://lottie.host/123f5095-70ce-4d75-9d24-c3c7904e682c/FgV3O7w8qT.lottie",
    loop: true,
    autoplay: true,
  });
};

export default function PaperPlaneLoader() {
  return (
    <div className="h-screen bg-blue-400">
      <PaperPlaneAnimation />
    </div>
  );
}
