def deepcopy(obj):
    """
    Creates a deep copy of a given object.
    The copy is completely independent of the original object.
    
    Args:
        obj: The object to be deep copied
        
    Returns:
        A deep copy of the input object
        
    Examples:
        >>> original = {"name": "John", "skills": ["Python", "JavaScript"]}
        >>> copy = deepcopy(original)
        >>> copy["skills"].append("Go")
        >>> print(original["skills"])  # ["Python", "JavaScript"]
        >>> print(copy["skills"])      # ["Python", "JavaScript", "Go"]
    """
    # Handle None or primitive values
    if obj is None or not isinstance(obj, (dict, list)):
        return obj
    
    # Handle lists
    if isinstance(obj, list):
        return [deepcopy(item) for item in obj]
    
    # Handle dictionaries
    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            result[key] = deepcopy(value)
        return result
    
    # Handle other types (should not reach here based on task requirements)
    return obj


# Test function to verify deep copy functionality
def test_deepcopy():
    """Test the deepcopy function with various test cases."""
    
    # Test 1: Simple object
    original1 = {"test": "test"}
    copy1 = deepcopy(original1)
    print(f"Test 1 - Simple object:")
    print(f"Original: {original1}")
    print(f"Copy: {copy1}")
    print(f"Are they the same object? {original1 is copy1}")
    print(f"Are they equal? {original1 == copy1}\n")
    
    # Test 2: Object with array
    original2 = {
        "name": "John",
        "skills": ["Python", "JavaScript", "Go"],
        "experience": 5
    }
    copy2 = deepcopy(original2)
    print(f"Test 2 - Object with array:")
    print(f"Original: {original2}")
    print(f"Copy: {copy2}")
    
    # Modify the copy to prove it's a deep copy
    copy2["skills"].append("Rust")
    print(f"After modifying copy:")
    print(f"Original skills: {original2['skills']}")
    print(f"Copy skills: {copy2['skills']}")
    print(f"Deep copy successful: {original2['skills'] != copy2['skills']}\n")
    
    # Test 3: Nested object
    original3 = {
        "user": {
            "name": "Alice",
            "address": {
                "city": "New York",
                "zipcode": "10001"
            },
            "hobbies": ["reading", "coding", "gaming"]
        },
        "active": True
    }
    copy3 = deepcopy(original3)
    print(f"Test 3 - Nested object:")
    print(f"Original: {original3}")
    print(f"Copy: {copy3}")
    
    # Modify nested structure
    copy3["user"]["address"]["city"] = "San Francisco"
    copy3["user"]["hobbies"].append("photography")
    print(f"After modifying nested copy:")
    print(f"Original city: {original3['user']['address']['city']}")
    print(f"Copy city: {copy3['user']['address']['city']}")
    print(f"Original hobbies: {original3['user']['hobbies']}")
    print(f"Copy hobbies: {copy3['user']['hobbies']}")
    print(f"Deep copy successful: {original3 != copy3}\n")
    
    # Test 4: Complex mixed structure
    original4 = {
        "company": "TechCorp",
        "employees": [
            {"name": "Bob", "role": "Developer", "skills": ["Python", "Django"]},
            {"name": "Alice", "role": "Designer", "skills": ["Figma", "Photoshop"]}
        ],
        "headquarters": {
            "location": {
                "country": "USA",
                "coordinates": {"lat": 40.7128, "lng": -74.0060}
            }
        }
    }
    copy4 = deepcopy(original4)
    print(f"Test 4 - Complex structure:")
    print(f"Original employees count: {len(original4['employees'])}")
    print(f"Copy employees count: {len(copy4['employees'])}")
    
    # Add employee to copy
    copy4["employees"].append({"name": "Charlie", "role": "Manager", "skills": ["Leadership"]})
    print(f"After adding employee to copy:")
    print(f"Original employees: {len(original4['employees'])}")
    print(f"Copy employees: {len(copy4['employees'])}")
    print(f"Deep copy successful: {len(original4['employees']) != len(copy4['employees'])}")


# Advanced utility functions
def get_object_size(obj):
    """Calculate the size of an object in characters when converted to string."""
    return len(str(obj))

def get_nested_levels(obj, level=0):
    """Calculate the maximum nesting level of an object."""
    max_level = level
    if isinstance(obj, dict):
        for value in obj.values():
            if isinstance(value, (dict, list)):
                max_level = max(max_level, get_nested_levels(value, level + 1))
    elif isinstance(obj, list):
        for item in obj:
            if isinstance(item, (dict, list)):
                max_level = max(max_level, get_nested_levels(item, level + 1))
    return max_level

def compare_objects(original, copy):
    """Compare two objects and return detailed comparison."""
    return {
        'same_reference': original is copy,
        'same_content': original == copy,
        'original_id': id(original),
        'copy_id': id(copy),
        'deep_copy_successful': original is not copy and original == copy
    }


if __name__ == "__main__":
    # Run tests
    test_deepcopy()
    
    # Performance test
    print("\n" + "="*50)
    print("PERFORMANCE TEST")
    print("="*50)
    
    import time
    
    # Large nested object
    large_object = {
        "users": [
            {
                "id": i,
                "name": f"User{i}",
                "data": {
                    "preferences": {"theme": "dark", "language": "en"},
                    "history": [f"action{j}" for j in range(10)]
                }
            } for i in range(100)
        ],
        "metadata": {
            "total_users": 100,
            "nested": {
                "deep": {
                    "deeper": {
                        "deepest": "value"
                    }
                }
            }
        }
    }
    
    start_time = time.time()
    large_copy = deepcopy(large_object)
    end_time = time.time()
    
    print(f"Large object deep copy completed in: {(end_time - start_time) * 1000:.2f} ms")
    print(f"Object size: {get_object_size(large_object)} characters")
    print(f"Nested levels: {get_nested_levels(large_object)}")
    print(f"Deep copy verification: {compare_objects(large_object, large_copy)}")
