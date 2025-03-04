const ScreenshotsGallery: React.FC<{ screenshots: string[] }> = ({
  screenshots,
}) => (
  <div className="screenshots-gallery">
    {screenshots.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Screenshot ${index + 1}`}
        className="screenshot-image"
        width={640}
        height={360}
        loading="lazy"
      />
    ))}
  </div>
);
export default ScreenshotsGallery;
