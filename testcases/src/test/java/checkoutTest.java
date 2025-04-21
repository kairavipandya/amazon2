import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CheckoutTest {
    private Checkout checkout;

    @BeforeEach
    void setUp() {
        checkout = new Checkout();
    }

    @AfterEach
    void tearDown() {
        checkout = null;
    }

    @Test
    void testSuccessfulCheckout() {
        String result = checkout.processCheckout("1234567891234567", "123", "08/30");
        assertEquals("Successful Checkout", result);
    }

    @Test
    void testInvalidCardNumber() {
        String result = checkout.processCheckout("1234-5678-9123-4567", "123", "08/30");
        assertEquals("Card Number is incorrect", result);
    }

    @Test
    void testInvalidCVV() {
        String result = checkout.processCheckout("1234567891234567", "1234", "08/30");
        assertEquals("CVV is incorrect", result);
    }

    @Test
    void testInvalidExpirationDate() {
        String result = checkout.processCheckout("1234567891234567", "123", "07/24");
        assertEquals("Insert a valid expiration date", result);
    }
}
