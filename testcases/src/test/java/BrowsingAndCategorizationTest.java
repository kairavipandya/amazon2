import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BrowsingAndCategorizationTest {
    private BrowsingAndCategorization browser;

    @BeforeEach
    void setUp() {
        browser = new BrowsingAndCategorization();
    }

    @AfterEach
    void tearDown() {
        browser = null;
    }

    @Test
    void testClickKeyboardProduct() {
        String result = browser.clickProduct("Keyboard");
        assertEquals("Keyboard - Product Information Displayed", result);
    }

    @Test
    void testClickMouseProductOutOfStock() {
        String result = browser.clickProduct("Mouse");
        assertEquals("Mouse - Sorry this item is out of stock.", result);
    }

    @Test
    void testClickTechnologyCategory() {
        String result = browser.clickCategory("Technology");
        assertEquals("Products in Technology: Keyboard Mouse", result); // Order preserved now
    }

    @Test
    void testEnterWebsite() {
        String result = browser.enterWebsite();
        assertEquals("Product browsing page displayed", result);
    }
}
