<template>
    <h2> Welcome to TANA! </h2>
    <h3> We make monitoring inventory a piece of cake </h3>

    <div class="image-row">
        <figure>
            <img src="/src/assets/restaurant4.png" class="stock-img" />
            <figcaption>"We couldn't do it without Trey, Anh, Neida, and Amaris" - Block16.</figcaption>
        </figure>

        <figure>
            <img src="/src/assets/restaurant3.png" class="stock-img" />
            <figcaption>"TANA keeps our fridge fully stacked - The Bear</figcaption>
        </figure>

        <figure>
            <img src="/src/assets/restaurant5.png" class="stock-img" />
            <figcaption>"TANA is BANANAS. B A N A N A S" - Omaha Taphouse</figcaption>
        </figure>
    </div>

    <div class="info-section">
    <div class="info-box left-box">
        <p><strong>Stock your kitchen.</strong></p>
        <p><strong>Serve your best.</strong></p>
        <p><strong>Save room for dessert.</strong></p>
        <p>At TANA, we believe that managing your inventory should be as easy as pie. This is why we offer the best inventory management system available--all for free. 
        <P>Voted as Omaha's Best Inventory Management Solution for 5 consecutive years!</P>
        </p>
    </div>

    <div class="info-box right-box">
        <p>Sign up for a free account:</p>
        <a href="/register" class="custom-link">Get started here</a>
        <p>Already have an account?</p>
        <a href="/login" class="custom-link">Login here</a>
    </div>
    </div>
</template>



<style scoped>
h2{
    color: #002872;
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
}

h3 {
    color: #002872;
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
}

.image-row {
    display: flex;
    justify-content: center;
    gap: 20px;
}

figure {
    text-align: center;
    margin: 0;
}

.stock-img {
    width: 400px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}

.image-item p {
    margin-top: 6px;
    font-size: 0.9rem;
    color: #002872;
}

.info-section {
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin-top: 40px;
    gap: 20px;
    padding: 0 20px;
}

.info-box {
    flex: 1;                 
    padding: 20px;
    border-radius: 16px;
    color: #01266b;
    min-height: 120px;
}

.left-box {
    flex: 3;
    background-color: #f9e9b9;
}

.right-box {
    flex: 1;
    background-color: #b9d9f9;
}

.custom-link {
    display: inline-block;
    margin: 10px 0;
    padding: 10px 20px;
    background-color: #002872;
    color: white;
    text-decoration: none;
    border-radius: 8px;
}
</style>


