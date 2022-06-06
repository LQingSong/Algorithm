import java.util.HashSet;
import java.util.Set;

/**
 * Author: Liz
 * Date: 2022/6/6 09:36
 * Description
 */
public class UniqueEmails {
    public static int numUniqueEmails(String[] emails) {
        Set<String> collection = new HashSet<>();
        for (int i = 0, len = emails.length; i < len; i++) {
            String[] str = emails[i].split("@");
            StringBuilder localName = new StringBuilder();
            for(char c : str[0].toCharArray()) {
                if (c == '.') continue;
                if (c == '+') break;
                localName.append(c);
            }
            collection.add((localName.append(' ').append('@' + str[1]).toString()));
        }
        return collection.size();
    }
}
