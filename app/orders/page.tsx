import Container from "@/components/Container";
import NullData from "@/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Orders | ElectroSwift",
};

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  // Orders are not stored yet; show an empty state until checkout is implemented
  return (
    <div className="p-8">
      <Container>
        <h1 className="font-bold text-2xl mb-4">Your Orders</h1>
        <NullData title="You haven't placed any orders yet." />
      </Container>
    </div>
  );
};

export default Orders;
