import { CardProduct } from "@/components/CardProduct/CardProduct"
export default function Home() {
  return (
    <div>
      <CardProduct 
      title="Product title" 
      description="Product description" 
      price={100} 
      productImage="/rounded-rectangle.png" />
    </div>
  );
}
