package in.gopal.college.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gopal.college.entity.College;
import in.gopal.college.repository.CollegeRepository;

@RestController
@RequestMapping("/api/search")
@CrossOrigin("*")
public class SearchController {
	
    @Autowired
    private CollegeRepository repo;

    @GetMapping("/districts")
    public List<String> districts() {
        return repo.getDistricts();
    }

    @GetMapping("/programmes/{district}")
    public List<String> programmes(
            @PathVariable String district) {

        return repo.getProgrammes(district);
    }

    @GetMapping("/colleges")
    public List<College> colleges(
            @RequestParam String district,
            @RequestParam String programme) {

        return repo.findByDistrictAndCourse(
                district,
                programme
        );
    }

    @GetMapping("/filter")
    public List<College> filter(
            @RequestParam String district,
            @RequestParam String programme,
            @RequestParam Long collegeId) {

        return repo.findByDistrictAndCourseAndCollegeId(
                district,
                programme,
                collegeId
        );
    }

}
