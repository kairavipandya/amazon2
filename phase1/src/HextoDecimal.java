
import java.util.Scanner;

public class HextoDecimal {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        System.out.print("Enter a hexadecimal number: ");
        Scanner in = new Scanner(System.in);
        String hexInput = in.nextLine();
        try {
            System.out.println("Decimal value of " + hexInput + " is " + hexToDec(hexInput));
        } catch (NumberFormatException e) {
            System.out.println("Incorrect Input(not a binary number): " + hexInput);
        }
	}
	
	public static int hexToDec(String hexString) throws NumberFormatException {
        int total = 0;
        char ch;
        for (int i = 0; i < hexString.length(); ++i) {
            ch = Character.toUpperCase(hexString.charAt(i));
            if (ch >= '0' && ch <= '9') {
                total += Math.pow(16, hexString.length() - i - 1) * (ch - '0');
            } else if (ch >= 'A' && ch <= 'F') {
                total += Math.pow(16, hexString.length() - i - 1) * (10 + (ch - 'A'));
            } else {
                throw new NumberFormatException();
            }
        }
        return total;
    }

}
