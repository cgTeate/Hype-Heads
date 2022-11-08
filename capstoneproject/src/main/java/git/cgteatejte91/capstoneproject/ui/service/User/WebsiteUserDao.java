package git.cgteatejte91.capstoneproject.ui.service.User;

import java.util.List;

import git.cgteatejte91.capstoneproject.ui.model.User.WebsiteUser;

public interface WebsiteUserDao {

    String signUp(WebsiteUser websiteUser);
    // String signIn(WebsiteUser websiteUser);
    WebsiteUser getUser(String username);
    // List<WebsiteUser> getUser(String username);
    List<WebsiteUser> getAllSellers();
    List<WebsiteUser> getAllCustomers();
    List<WebsiteUser> getAllUsers();
    void deleteUser(String username);
    void updateUser(String username, WebsiteUser user);
    // WebsiteUser updateUser(String username, WebsiteUser user);

}
