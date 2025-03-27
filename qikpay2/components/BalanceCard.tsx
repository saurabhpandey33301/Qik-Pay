

export const BalanceCard = ({ amount }: { amount: number }) => {
    return (
  
<div className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-6">
    {/* Left Section - Brand Info */}
    <div className="flex flex-col space-y-2 text-center md:text-left">
        <div className="text-5xl font-extrabold font-mono tracking-wide">QikPay</div>
        <div className="text-sm font-light opacity-80">Your Digital Savings Account</div>
    </div>

    {/* Right Section - Balance Card */}
    <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm p-5 rounded-lg shadow-md text-center w-full md:w-auto transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl will-change-transform">
        <div className="text-lg font-semibold uppercase tracking-widest transition-transform duration-500 ease-in-out">Current Balance</div>
        <div className="text-3xl font-bold mt-2 transition-transform duration-500 ease-in-out">₹{(amount / 100).toFixed(2)}</div>
    </div>
</div>



    );
};
