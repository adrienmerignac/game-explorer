const PlatformList: React.FC<{
  platforms: [
    {
      platform: {
        id: number;
        name: string;
        slug: string;
      };
    }
  ];
}> = ({ platforms }) => (
  <div className="platform-list">
    <h2>Compatible platforms :</h2>
    <ul>
      {platforms?.map((platform) => (
        <li key={platform.platform.id}>{platform.platform.name}</li>
      ))}
    </ul>
  </div>
);
export default PlatformList;
