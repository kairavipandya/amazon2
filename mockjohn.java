import java.util.Scanner;

//mock code print even numbers
public class EvenNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the upper limit: ");
        int limit = scanner.nextInt();
        
        System.out.println("Even numbers up to " + limit + ":");
        
        for (int i = 2; i <= limit; i += 2) {
            System.out.print(i + " ");
        }
        
        scanner.close();
    }
}
