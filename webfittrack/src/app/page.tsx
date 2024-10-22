import MenuButtonGroup from "./components/Menu/MenuButtonGroup/MenuButtonGroup";
export default function Home() {
  const buttonsData = [
    { text: 'Button 1', imageSrc: '/user.svg' },
    { text: 'Button 2', imageSrc: '/user.svg' },
    { text: 'Button 3', imageSrc: '/user.svg' },
    { text: 'Button 4', imageSrc: '/user.svg' },
    { text: 'Button 5', imageSrc: '/user.svg' },
  ];
  return (
    <>
     
     <MenuButtonGroup buttonsData={buttonsData} />;
      
    </>
  );
}
